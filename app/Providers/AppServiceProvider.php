<?php

namespace App\Providers;

use App\Services\Pdf\PdfUploader;
use App\Services\Pdf\PdfUploaderInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
        $this->app->bind(PdfUploaderInterface::class, PdfUploader::class);
    }
}
