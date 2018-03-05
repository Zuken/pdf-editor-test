<?php
/**
 * Created by PhpStorm.
 * User: apple
 * Date: 05/03/2018
 * Time: 10:48
 */

namespace App\Services\Pdf;

use Imagick;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class PdfUploader implements PdfUploaderInterface
{

    /**
     * @param UploadedFile $file
     * @return PdfUploadResult
     */
    public function upload(UploadedFile $file)
    {
        $localPath = $file->storePublicly( 'public/pdf' );
        $absPath = storage_path('app/'.$localPath);

        $filePath = 'pdf/'.basename($absPath);
        $thumbPath = 'pdf/thumb/'.basename($absPath).'.jpg';

        $thumbnail = $this->generateThumbnail( $absPath );
        Storage::disk('public')->put($thumbPath, $thumbnail);
        $uploadResult = new PdfUploadResult($filePath, $thumbPath);
        return $uploadResult;
    }
    protected function generateThumbnail($pdfFilePath)
    {
        $image = new Imagick($pdfFilePath.'[0]'); //getting first page
        $image->setImageFormat('jpg');
        $image->setImageCompression(Imagick::COMPRESSION_JPEG);
        $image->setImageCompressionQuality(90);
        $image->setResolution(300,300);
        $image->setImageUnits(Imagick::RESOLUTION_PIXELSPERINCH);
        return $image;
    }
}