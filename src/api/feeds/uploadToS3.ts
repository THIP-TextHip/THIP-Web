export const uploadFileToS3 = async (
  presignedUrl: string,
  file: File
): Promise<boolean> => {
  try {
    const response = await fetch(presignedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });

    return response.ok;
  } catch (error) {
    console.error('S3 업로드 실패:', error);
    return false;
  }
};