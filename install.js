module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/ToTheBeginning/PuLID.git app",
        ]
      }
    },
    // windows nvidia pre-5000 series
    {
      when: "{{platform === 'win32' && gpu === 'nvidia'}}",
      method: "shell.run",
      params: {
        conda: {
          path: ".env",
        },
        message: "conda install pytorch=2.1.0 torchvision=0.16.0 pytorch-cuda=11.8 -c pytorch -c nvidia --yes"
      }
    },
    // macos
    {
      "when": "{{platform === 'darwin'}}",
      "method": "shell.run",
      "params": {
        "conda": "{{args && args.conda ? args.conda : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        //  "message": "uv pip install torch torchvision torchaudio"
      },
    },
    {
      method: "shell.run",
      params: {
        conda: {
          path: ".env",
        },
        message: [
          "pip install -r app/requirements.txt",
          "pip install xformers huggingface-hub==0.25.2"
        ]
      },
    }
  ]
}
