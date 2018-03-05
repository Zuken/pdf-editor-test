<?php
/**
 * Created by PhpStorm.
 * User: apple
 * Date: 05/03/2018
 * Time: 10:50
 */

namespace App\Services\Pdf;


class PdfUploadResult
{
    protected $file;
    protected $thumb;
    public function __construct($filePath, $thumbnailPath)
    {
        $this->file = $filePath;
        $this->thumb = $thumbnailPath;
    }

    /**
     * @return mixed
     */
    public function getFile()
    {
        return $this->file;
    }

    /**
     * @return mixed
     */
    public function getThumb()
    {
        return $this->thumb;
    }
}