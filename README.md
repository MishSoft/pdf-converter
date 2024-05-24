# PDF Converter Application

This application allows users to upload image files, recognize text using OCR (Optical Character Recognition), and generate a Word document with the recognized text formatted to look like handwriting.

## Features

- Upload image files
- Recognize text from images using Tesseract.js
- Generate a Word document with the recognized text
- Support for multiple languages (English, Georgian, Russian)

## Installation

To get started with this project, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/username/repository.git
    cd repository
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Start the development server**:

    ```bash
    npm run dev
    ```

## Usage

1. **Upload a File**: Click on the "Upload File" button to select an image file from your computer.
2. **Choose Language**: Select the language for OCR (English, Georgian, Russian).
3. **Generate Document**: Click on the "Generate" button to start the OCR process and generate a Word document with the recognized text.

## Project Structure

- `src/`: Contains the source code of the application.
  - `components/`: Contains React components (`UploadFiles`, `UploadedFile`).
  - `pages/`: Contains Next.js pages.
- `public/`: Public assets.
- `tests/`: Test files.
- `.gitignore`: Specifies files and directories to be ignored by Git.
- `package.json`: Lists project dependencies and scripts.
- `README.md`: Project documentation.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Contact Information

For questions or comments, please reach out to [your-email@example.com].
