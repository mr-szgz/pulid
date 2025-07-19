module.exports = {
  daemon: true,
  /*
  To achieve this, you can attach a env array in a script.
  {
    "env": [<requiremd_env>, <required_env>, ...],
    "run": [
      ...
    ]
  }
  where <required_env> is an object that describes the required environment variables:
  <required_env> := {
    key: <environment_variable_name>,
    title: <title>,
    description: <description>,
    default: <default_value>,
    host: <key_host>,
  }
  */
  run: [
    {
      method: "shell.run",
      params: {
        conda: {
          path: ".env",
        },
        message: [
          "{{ args.edition == '1.1' ? 'pip install basicsr' : '' }}",
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        conda: {
          path: ".env",
        },
        message: [
          "cd app && python {{args.edition == 'default' ? 'app.py' : ''}} {{ args.edition == '1.1' ? 'app_v1_1.py' : ''}} {{ args.edition == 'flux' ? 'app_flux.py' : ''}}",    // Edit with your custom commands
        ],
        on: [{
          // The regular expression pattern to monitor.
          // When this pattern occurs in the shell terminal, the shell will return,
          // and the script will go onto the next step.
          "event": "/http:\/\/[0-9.]+(:[0-9]+)?/",

          // "done": true will move to the next step while keeping the shell alive.
          // "kill": true will move to the next step after killing the shell.
          "done": true
        }]
      }
    },
    {
      // This step sets the local variable 'url'.
      // This local variable will be used in pinokio.js to display the "Open WebUI" tab when the value is set.
      method: "local.set",
      params: {
        // the input.event is the regular expression match object from the previous step
        url: "http://127.0.0.1{{input.event[1]}}",
        edition: "{{args.edition ? args.edition : (args.local.edition ? args.local.edition : 'v1')}}",
      }
    }
  ]
}
