import {
    generateUploadButton,
    generateUploadDropzone,
} from "@uploadthing/react";

// we point the helpers at our own server route so the
// client never has to guess where the metadata lives. this
// also makes the dropzone initialise faster and avoids the
// "readying" state from hanging when the URL is mis‑configured.
const UT_API_URL = "/api/uploadthing";

export const UploadButton = generateUploadButton({ url: UT_API_URL });
export const UploadDropzone = generateUploadDropzone({ url: UT_API_URL });
