//This project creates a simple web application called "Image gradient Framer" that allows users to upload an image, frame it with a color of their choice, and download the framed image. Here's a breakdown of its features, capabilities, functions, libraries, and frameworks:

//1. **Features and Capabilities:**   - Image upload: Users can upload an image from their device.              - Frame customization: Users can choose the color of the frame for the image.                                - Preview: The uploaded image with the selected frame color is displayed for preview.                          - Download: Users can download the framed image with a customized frame color.

//2. **Functions:**                - `handleImageUpload(event)`: Handles the image upload event. It reads the uploaded image file, displays it for preview, and renders the frame.                             - `renderFrame()`: Renders the frame on the canvas with the chosen frame color.                          - Event listeners: Listens for changes in the image upload and frame color selection to trigger appropriate actions.                  - Download button click event: Initiates the download of the framed image.

//3. **Libraries and Frameworks:**    - This webpage primarily uses vanilla JavaScript for scripting.          - It utilizes HTML5 features such as the `<canvas>` element for drawing the frame.                            - CSS is used for styling elements and making the webpage responsive.     - No external libraries or frameworks (like jQuery, React, etc.) are used.

//Overall, this web application project is suitable for users who want to add frames to their images with custom colors and then download the framed images. It's a lightweight and straightforward tool without the need for any complex libraries or frameworks.



const imageUpload = document.getElementById('image-upload');
    const frameColorPicker = document.getElementById('frame-color');
    const previewImage = document.getElementById('preview-image');
    const frameCanvas = document.getElementById('frame-canvas');
    const downloadButton = document.getElementById('download-button');

    imageUpload.addEventListener('change', handleImageUpload);
    frameColorPicker.addEventListener('change', renderFrame);

    function handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          previewImage.src = event.target.result;
          renderFrame();
        };
        reader.readAsDataURL(file);
      }
    }

    function renderFrame() {
      const ctx = frameCanvas.getContext('2d');
      const image = new Image();
      image.onload = function() {
        frameCanvas.width = image.width;
        frameCanvas.height = image.height;
        ctx.clearRect(0, 0, frameCanvas.width, frameCanvas.height);
        ctx.drawImage(image, 0, 0, frameCanvas.width, frameCanvas.height);

        // Apply frame
        const gradient = ctx.createLinearGradient(0, 0, frameCanvas.width, frameCanvas.height);
        gradient.addColorStop(0, frameColorPicker.value);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, frameCanvas.width, frameCanvas.height);
      };
      image.src = previewImage.src;
    }

    downloadButton.addEventListener('click', () => {
      const downloadLink = document.createElement('a');
      downloadLink.download = 'framed_image.png';
      downloadLink.href = frameCanvas.toDataURL('image/png');
      downloadLink.click();
    });