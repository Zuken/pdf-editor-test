<?php
/**
 * Created by PhpStorm.
 * User: apple
 * Date: 05/03/2018
 * Time: 10:47
 */

namespace App\Services\Pdf;


use Illuminate\Http\UploadedFile;

interface PdfUploaderInterface
{
    /**
     * @param $file
     * @return PdfUploadResult
     */
    public function upload(UploadedFile $file);
}