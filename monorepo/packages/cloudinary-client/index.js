const cloudinaryLib = require("cloudinary").v2;

/**
 * createCloudinaryClient(config, logger) -> { uploadFile, uploadMultipleFiles, deleteFile }
 * config shape: { cloudName, apiKey, apiSecret, folder }
 */
function createCloudinaryClient(config, logger = console) {
  const { cloudName, apiKey, apiSecret, folder = "uploads" } = config;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary requires cloudName, apiKey, and apiSecret");
  }

  cloudinaryLib.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  logger.info("Cloudinary client initialized");

  function uploadBuffer(buffer, uploadOptions) {
    return new Promise((resolve, reject) => {
      const stream = cloudinaryLib.uploader.upload_stream(uploadOptions, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
      stream.end(buffer);
    });
  }

  /**
   * uploadFile(file) - accepts a Multer memoryStorage file (req.file):
   * { buffer, originalname, mimetype }
   */
  async function uploadFile(file, options = {}) {
    if (!file?.buffer) {
      throw new Error("uploadFile expects a Multer file with a buffer (use memoryStorage)");
    }

    try {
      const result = await uploadBuffer(file.buffer, {
        folder: options.folder || folder,
        resource_type: "auto", // let Cloudinary detect image/video/raw
      });

      return {
        url: result.secure_url,
        publicId: result.public_id,
        resourceType: result.resource_type,
        format: result.format,
        bytes: result.bytes,
        originalName: file.originalname,
      };
    } catch (err) {
      logger.error(`Cloudinary upload failed: ${err.message}`);
      throw err;
    }
  }

  async function uploadMultipleFiles(files = [], options = {}) {
    return Promise.all(files.map((file) => uploadFile(file, options)));
  }

  async function deleteFile(publicId, resourceType = "image") {
    if (!publicId) return null;
    try {
      return await cloudinaryLib.uploader.destroy(publicId, { resource_type: resourceType });
    } catch (err) {
      logger.error(`Cloudinary delete failed for ${publicId}: ${err.message}`);
      throw err;
    }
  }

  return { uploadFile, uploadMultipleFiles, deleteFile };
}

module.exports = createCloudinaryClient;
