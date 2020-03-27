<!DOCTYPE html>
<html lang="<?php echo e(str_replace('_', '-', app()->getLocale())); ?>">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#000000" />
    <meta
    name="description"
    content="Página web oficial de La Candelaria Tumero"
    />
    <title>La Candelaria</title>

    <!-- Fonts -->
    <link rel="icon" href="favicon.png" />
    <link href="<?php echo e(mix('css/app.css')); ?>" rel="stylesheet">
  </head>
  <body>
    <noscript>Necesitas activar JavaScript para poder ver esta aplicaciรณn.</noscript>
    <div id="root"></div>
  </body>
  <script src="<?php echo e(mix('js/app.js')); ?>"></script>
</html>
<?php /**PATH /workspace/CandelariaReact/candelariaweb/backend/resources/views/index.blade.php ENDPATH**/ ?>