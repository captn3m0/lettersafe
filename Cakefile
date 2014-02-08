### 
 # Initial Tasks 
 # Add Initializer tasks here	
### 

fs = require 'fs'
path = require 'path'
util = require 'util'

pkg = JSON.parse fs.readFileSync('package.json', 'utf-8')
bowerpkg = JSON.parse fs.readFileSync('bower.json', 'utf-8')

runCommand = (command, optionsArray)->
	{spawn, exec} = require 'child_process'
	child = spawn command, optionsArray
	child.stdout.on 'data', (data)->
		console.log "  " + data.toString().trim()	


copyLibrary = (path)->
		spl = path.split('/')
		fname = spl[spl.length-1]
		if path.substr(-3) is '.js' then kw = 'js/libs'
		else if path.substr(-4) is '.css' then kw = 'stylesheets'
		else if path.substr(-4) in ['woff', '.ttf', '.eot', '.svg', '.otf'] then kw = 'fonts'
		
		dest = './public/' + kw + '/' + fname
		console.log '   ' + path + ' -> ' + dest
		fs.createReadStream(path)
			.pipe(fs.createWriteStream(dest))


copyResources = (packagePath, jsonMain)->
	m = jsonMain
	# Check if main is an array
	if Array.isArray m
		for f in m
			copyLibrary packagePath + '/' + f

	# If main does not exist
	else if not m?
		console.log "   'main' key is empty."

	# If main exists but is not an array
	else if typeof m is 'string'
		# console.log '  -- ' + packagePath + '/' + m
		copyLibrary packagePath + '/' +  m 






# Initial Tasks
task 'deps:check', 'checks required dependencies', ->
	console.log 'check:dependencies...'
	deps = Object.keys pkg.dependencies
	try
		for d in deps
			require.resolve d
		console.log "  All present."
		console.log "  'cake:build' to build source"
	catch e
		console.error "CheckDeps:: Packages missing..."
		console.error "  'cake install:dependencies' to correct."
		console.error 'Program will now exit.'
		process.exit(e.code)

task 'deps:install', 'installs required dependencies', ->
	console.log 'deps:install...'
	console.log '  Please Wait...'
	deps = Object.keys pkg.dependencies	
	child = spawn 'npm', ['install'].concat(deps)
	child.on 'data', dataHandler



# Libraries Tasks
task 'libs:check', 'checks if libraries exist', ->
	deps = Object.keys bowerpkg.dependencies
	

task 'libs:setup', 'copies libraries to ./public/js/libs', ->
	deps = Object.keys bowerpkg.dependencies

	for dep in deps
		npmJSON = 'bower_components/' + dep + '/package.json'
		bowerJSON = 'bower_components/' + dep + '/bower.json'
		componentJSON = 'bower_components/' + dep + '/component.json'
		console.log '-- ' + dep

		if fs.existsSync(npmJSON)
			j = JSON.parse fs.readFileSync(npmJSON)
			if j.main
				#console.log '   HasNPM'
				copyResources './bower_components/'+dep, j.main
				continue
		if fs.existsSync(bowerJSON)
			j = JSON.parse fs.readFileSync(bowerJSON)
			if j.main
				#console.log '   HasBower'
				copyResources './bower_components/'+dep, j.main
				continue
		if fs.existsSync(componentJSON)
			j = JSON.parse fs.readFileSync(componentJSON)
			copyResources './bower_components/' + dep, j.styles.concat(j.fonts)

		else console.log 'No package json file in ' + dep


# Fonts
task 'fonts:download', 'downloads fonts', ->


# Compile Tasks
task 'compile:coffee', 'compiles .coffee -> .js', ->
	console.log 'Compiling .coffee -> .js'
	{exec} = require 'child_process'
	cmd = 'coffee -cb -o ./public/js ./source/coffee'
	child = exec cmd, (error, stdout, stderr)->
		console.log error, stdout, stderr
	
task 'compile:stylus', 'compiles .styl -> .css', ->
	console.log 'Compiling .styl -> .css...'
	runCommand 'stylus', ['./source/stylus/style.styl', '-o', './public/stylesheets/']

task 'compile:jade', 'compiles .jade -> .html', ->
	console.log 'Compiling .jade -> .html'
	runCommand 'jade', ['./source/jade', '-P', '-D', '-o', './app/']

task 'compile:templates', 'compiles .jade templates', ->
	console.log 'Compiling clientjade templates...'
	{exec} = require 'child_process'
	cmd = 'clientjade source/templates/ > public/js/templates.js'
	child = exec cmd, (error, stdout, stderr)->
		console.log error, stdout, stderr

	




# Copy Tasks
task 'copy:templates', 'copies templates to app directory', ->
	console.log 'copy:templates'
	runCommand 'cp', ['-r', './source/templates/*', './public/js/templates/*']
	




# Build Tasks
task 'build', 'builds all sources', ->
	invoke 'deps:check'
	invoke 'compile:templates'
	invoke 'libs:setup'
	invoke 'compile:coffee'
	invoke 'compile:stylus'
	invoke 'compile:jade'


# Server Tasks
task 'server:start', 'Starts an express server', ->
	StartServer()
task 'server:stop', 'Stops an express server', ->
	StopServer()
task 'server:restart', 'Restarts express server', ->
	ReStartServer()

task 'start', 'builds with watch and starts server',->
	invoke 'compile:coffee'
	invoke 'compile:stylus'
	invoke 'compile:jade'
	invoke 'compile:templates'
	invoke 'server:start'


Res = {}
Res.Server = null


StartServer = ->
	fs = require 'fs'
	path = require 'path'
	express = require 'express'
	http = require 'http'
	basedir = path.resolve './app/'

	app = express()
	app.configure ()->
	  app.set 'port', 4332
	  app.use express.compress()
	  app.use express.bodyParser()
	  app.use express.static(basedir)


	app.get '*', (req, res)->
		route = req.originalUrl
		res.sendfile path.resolve(basedir, 'index.html')

	Res.Server = http.createServer(app).listen app.get('port'), ()->
		console.log "Server Started"
		console.log "http://127.0.0.1:" + app.get('port')

StopServer = -> 
	console.log 'Closing Server'
	Res.Server.close()
RestartServer = -> 
	console.log 'Restarting Server...'
	StopServer()
	StartServer()