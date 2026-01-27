import ImageKit from "imagekit-javascript";
import { Image } from "@imagekit/react";
import UserService from "./UserService";

const DEFAULT_URL_ENDPOINT = "https://ik.imagekit.io/xlpbkk1xx";

/**
 * Upload an image to ImageKit
 */
export const UploadImage = async (file, options = {}) => {
  const { folder = "uploads", fileName = "" } = options;

  if (!file) {
    throw new Error("No file provided");
  }

  // Get auth params from backend
  const auth = await UserService.getImgToken();

  const imagekit = new ImageKit({
    publicKey: auth.publicKey,
    urlEndpoint: auth.urlEndpoint || DEFAULT_URL_ENDPOINT,
  });

  const result = await imagekit.upload({
    file,
    fileName: fileName || file.name,
    folder,
    useUniqueFileName: false, // overwrite enabled
    token: auth.token,
    expire: auth.expire,
    signature: auth.signature,
  });

  return result.url;
};

/**
 * Upload user avatar (overwrites existing)
 */
export const UploadAvatar = async (file, userId) => {
  if (!file || !userId) {
    throw new Error("File and userId are required");
  }

  return UploadImage(file, {
    folder: "avatars",
    fileName: `user_${userId}.jpg`, // keep extension stable
  });
};

/**
 * Circular avatar component
 */
import { useState, useEffect } from "react";

export const Avatar = ({
  src, // e.g. "avatars/user_3.jpg"
  size = 96,
  alt = "avatar",
  urlEndpoint = DEFAULT_URL_ENDPOINT,
  className,
  style,
}) => {
  const [imgError, setImgError] = useState(false);

  // Reset error state when src changes
  useEffect(() => {
    setImgError(false);
  }, [src]);

  if (!src) return null;

  if (imgError) {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          overflow: "hidden",
          display: "inline-block",
          backgroundColor: "#f0f0f0", // Light gray background for fallback
          ...style,
        }}>
        <img
          src={`https://dummyjson.com/image/${size}x${size}/dcfce7/000000?text=${encodeURIComponent(alt.charAt(0).toUpperCase()) || "U"}`}
          alt={alt}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        display: "inline-block",
        ...style,
      }}>
      <Image
        urlEndpoint={urlEndpoint}
        src={src}
        width={size}
        height={size}
        alt={alt}
        onError={() => setImgError(true)}
        transformation={[
          {
            width: size,
            height: size,
            quality: 90,
            crop: "maintain_ratio",
            focus: "auto",
          },
        ]}
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
      />
    </div>
  );
};

/**
 * Fetch avatar by userId
 */
export const FetchAvatar = ({
  userId,
  size = 96,
  alt,
  urlEndpoint,
  className,
  style,
}) => {
  if (!userId) return null;

  return (
    <Avatar
      src={`avatars/user_${userId}.jpg`}
      size={size}
      alt={alt}
      urlEndpoint={urlEndpoint}
      className={className}
    />
  );
};
/**
 * Fetch category image by categoryName
 */
export const FetchCategory = ({
  categoryName,
  size = 96,
  alt,
  urlEndpoint,
  className,
  style,
}) => {
  if (!categoryName) return null;

  return (
    <Avatar
      src={`category/${categoryName}.jpg`}
      size={size}
      alt={alt || categoryName}
      urlEndpoint={urlEndpoint}
      className={className}
      style={style}
    />
  );
};

export default {
  UploadImage,
  UploadAvatar,
  Avatar,
  FetchAvatar,
  FetchCategory,
};
