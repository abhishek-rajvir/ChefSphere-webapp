import ImageKit from "imagekit-javascript";
import { Image } from "@imagekit/react";
import UserService from "./UserService";

// Hardcoded authentication endpoint
const AUTH_ENDPOINT = "/imagekit/auth";

// Default URL endpoint - will be overridden by backend if available
const DEFAULT_URL_ENDPOINT = "https://ik.imagekit.io/xlpbkk1xx";

/**
 * Upload an image to ImageKit
 * @param {File} file - The file to upload
 * @param {Object} options - Upload options
 * @param {string} options.folder - Folder path for upload (default: "/uploads")
 * @param {string} options.fileName - Custom file name (optional, defaults to original file name)
 * @returns {Promise<string>} - Returns the uploaded image URL on success
 * @throws {Error} - Throws error on failure
 */
export const UploadImage = async (file, options = {}) => {
  const { folder = "/uploads", fileName = "" } = options;

  if (!file) {
    throw new Error("No file provided");
  }

  // Get auth params including publicKey and urlEndpoint from backend
  const auth = await UserService.getImgToken();

  // Create ImageKit instance with credentials from backend
  const imagekit = new ImageKit({
    publicKey: auth.publicKey,
    urlEndpoint: auth.urlEndpoint || DEFAULT_URL_ENDPOINT,
    authenticationEndpoint: AUTH_ENDPOINT,
  });

  const result = await imagekit.upload({
    file,
    fileName: fileName || file.name,
    folder: folder,
    token: auth.token,
    expire: auth.expire,
    signature: auth.signature,
  });

  return result.url;
};

/**
 * Get an ImageKit Image component for displaying images
 * @param {Object} props - Image properties
 * @param {string} props.name - The image path/name (src)
 * @param {number} props.width - Image width
 * @param {number} props.height - Image height
 * @param {string} props.alt - Alt text (optional, defaults to name)
 * @param {string} props.urlEndpoint - Custom URL endpoint (optional)
 * @returns {JSX.Element|null} - Returns ImageKit Image component or null on error
 */
export const FetchImage = ({ name, width, height, alt, urlEndpoint }) => {
  if (!name) {
    console.log("FetchImage: No image name provided, keeping image blank");
    return null;
  }
  if (!width) {
    console.log("FetchImage: No width provided, keeping image blank");
    return null;
  }
  if (!height) {
    console.log("FetchImage: No height provided, keeping image blank");
    return null;
  }

  return (
    <Image
      urlEndpoint={urlEndpoint || DEFAULT_URL_ENDPOINT}
      src={name}
      width={width}
      height={height}
      alt={alt || name}
    />
  );
};

export default { UploadImage, FetchImage };
