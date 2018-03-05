<?php

namespace App\Http\Controllers;

use App\Http\Requests\PdfFileStore;
use App\Http\Resources\PdfFileResource;
use App\Models\PdfFile;
use App\Services\Pdf\Exceptions\FileUploadException;
use App\Services\Pdf\PdfUploaderInterface;

class PdfController extends Controller
{
    //
    public function index()
    {
        $pdfFiles = PdfFile::orderBy('created_at', 'ASC')->paginate(20);
        return PdfFileResource::collection($pdfFiles);
    }
    public function store(PdfFileStore $pdfStoreRequest, PdfUploaderInterface $pdfUploader)
    {
        $pdfFile = new PdfFile();
        $file = $pdfStoreRequest->file('file');
        $pdfFile->name = $file->getClientOriginalName();

        $uploadResult = $pdfUploader->upload($file);
        $pdfFile->path = $uploadResult->getFile();
        $pdfFile->thumb = $uploadResult->getThumb();
        $pdfFile->save();


        return new PdfFileResource($pdfFile);
    }

}
