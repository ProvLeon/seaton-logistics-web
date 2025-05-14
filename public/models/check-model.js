// check-model.js - Script to check if GLTF/GLB models are valid
// This can be run with Node.js

const fs = require('fs');
const path = require('path');

// Function to check if a GLB file appears to have valid headers
function checkGLBFile(filePath) {
  try {
    // Read the first 12 bytes of the file
    const fd = fs.openSync(filePath, 'r');
    const buffer = Buffer.alloc(12);
    fs.readSync(fd, buffer, 0, 12, 0);
    fs.closeSync(fd);
    
    // GLB files start with a magic number "glTF" followed by version (2) and file length
    const magic = buffer.toString('ascii', 0, 4);
    const version = buffer.readUInt32LE(4);
    const fileLength = buffer.readUInt32LE(8);
    
    // Check if the file has the right magic number and version
    const isValidHeader = magic === 'glTF' && version === 2;
    const actualSize = fs.statSync(filePath).size;
    
    console.log(`File: ${path.basename(filePath)}`);
    console.log(`Magic number: ${magic} (Expected: glTF) - ${magic === 'glTF' ? 'OK' : 'FAIL'}`);
    console.log(`Version: ${version} (Expected: 2) - ${version === 2 ? 'OK' : 'FAIL'}`);
    console.log(`File length in header: ${fileLength} bytes`);
    console.log(`Actual file size: ${actualSize} bytes - ${fileLength === actualSize ? 'OK' : 'MISMATCH'}`);
    console.log(`Overall validity: ${isValidHeader ? 'LIKELY VALID' : 'LIKELY INVALID'} GLB file\n`);
    
    return isValidHeader;
  } catch (error) {
    console.error(`Error checking file ${filePath}:`, error);
    return false;
  }
}

// Main function
function main() {
  console.log('=== GLB Model Validator ===\n');
  
  const modelsDir = __dirname;
  let files;
  
  try {
    files = fs.readdirSync(modelsDir);
  } catch (error) {
    console.error('Error reading models directory:', error);
    return;
  }
  
  const glbFiles = files.filter(file => file.toLowerCase().endsWith('.glb'));
  
  if (glbFiles.length === 0) {
    console.log('No GLB files found in the directory.');
    return;
  }
  
  console.log(`Found ${glbFiles.length} GLB file(s)\n`);
  
  for (const file of glbFiles) {
    checkGLBFile(path.join(modelsDir, file));
  }
}

// Run the script
main();