# omnipod-file-reader

This is a fork of [ibf-file-reader](https://github.com/balshor/ibf-file-reader). This library parses a binary IBF file from an Omnipod PDM into an array.

All credit goes to the original author(s). All this repo does is package up the original library into one `parseOmnipodFile` function, and provides the documentation below.

### Usage

```js
import fs from 'fs';
import parseOmnipodFile from 'omnipod-file-reader';

const MY_IBF_FILE = './test/input.ibf';
const MY_OUTPUT_FILE = './test/output.json';

parseOmnipodFile(MY_IBF_FILE).then((parsedData) => {
  const jsonData = JSON.stringify(parsedData, null, 2);

  fs.writeFile(MY_OUTPUT_FILE, jsonData, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Finished saving to ${MY_OUTPUT_FILE}.`);
    }
  });
}).catch(console.error);
```

### Notes

If you're using macOS, you'll need [Android File Transfer](https://www.android.com/filetransfer/) installed to be able to extract your Omnipod's IBF data file.

### License

MIT
