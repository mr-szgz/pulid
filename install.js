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
    // windows nvidia
    {
      "when": "{{platform === 'win32' && gpu === 'nvidia'}}",
      "method": "shell.run",
      "params": {
        "venv": ".env",
        "path": "app",
        "conda": {
          path: path.resolve(__dirname, '.env')
        },
        "message": [
          "conda install pytorch=2.1.0 torchvision=0.16.0 pytorch-cuda=11.8 -c pytorch -c nvidia -c conda-forge --yes",
          "{{args && args.xformers ? 'pip install xformers' : ''}}",
          "{{args && args.triton ? 'pip install -U triton-windows --force-reinstall' : ''}}"
        ]
      },
    },
    // macos
    {
      "when": "{{platform === 'darwin'}}",
      "method": "shell.run",
      "params": {
        "venv": ".env",
        "path": "app",
        "conda": {
          path: path.resolve(__dirname, '.env')
        },
        "message": "uv pip install --pre torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/nightly/cpu"
      },
    },
    // Edit this step with your custom install commands
    {
      method: "shell.run",
      params: {
        path: "app",                // Edit this to customize the path to start the shell from
        conda: {
          path: path.resolve(__dirname, '.env')
        },
        message: [
          "pip install spaces",
          "pip install -r ./requirements.txt",
          "conda install diffusers=0.25.0 transformers=4.43.3 opencv einops ftfy facexlib accelerate huggingface_hub timm sentencepiece fire safetensors numpy=1.24.1 -c pytorch -c nvidia -c conda-forge --yes",
        ]
      }
    },
  ]
}
