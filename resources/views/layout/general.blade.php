<!DOCTYPE html>
<html lang="es">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>::SENNOVA::</title>

        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link href="css/all.css" rel="stylesheet">
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="css/bootstrap4-toggle.min.css" rel="stylesheet">
        <link href="css/fontawesome.css" rel="stylesheet">
        <?php echo '<script type="text/javascript" src = "js/datatables.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>

        <?php echo '<script type="text/javascript" src = "js/bootstrap4-toggle.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>

        <link rel="stylesheet" type="text/css" href="css/datatables.min.css"/>
        <?php echo '<script type="text/javascript" src = "js/dataTables.bootstrap4.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "js/dataTables.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
        <?php echo "<link rel='stylesheet' href='css/generalPage.css?v=".date("Y-m-d H:i:s")."'>";?>
        
        <?php echo '<script type="text/javascript" src = "js/jquery-ui.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "js/config.js?v='.date("Y-m-d H:i:s").'"></script>';?>

        <?php echo '<script type="text/javascript" src = "js/popper.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "js/bootstrap.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>


        <?php echo '<script type="text/javascript" src = "js/jquery-ui.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "js/bootstrap-datepicker.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "js/jquery.creditCardValidator.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        
        <style>
            
        </style>
    </head>
    <body>
        <div class = 'ContentHeader'>
            <div class = 'LogoPage'>
                <img src ='image/logopa.png' />
            </div>
        </div>
        {{ csrf_field() }}
        @yield('content')
        
        <div class = 'footerPage2'>
            <ul>
                <li><img src ='image/logopa.png'/></li>
                <li><img src="image/icons/area.png" alt="logo"></li>
                <li><img src="image/icons/argos.jpg" alt="logo"></li>
                <li><img src="image/icons/autodesk.png" alt="logo"></li>
                <li><img src="image/icons/geosystemin.jpg" alt="logo"></li>
                <li><img src="image/icons/iac.png" alt="logo"></li>
                <li><img src="image/icons/icra.png" alt="logo"></li>
                <li><img src="image/icons/microcad.png" alt="logo"></li>
                <li><img src="image/icons/naska.png" alt="logo"></li>
                <li><img src="image/icons/pavco.png" alt="logo"></li>
                <li><img src="image/icons/red.gif" alt="logo"></li>
                <li><img src="image/icons/santander.png" alt="logo"></li>
                <li><img src="image/icons/sena.png" alt="logo"></li>
            </ul>
        </div>
        
        <div class="modal fade" id="ModalEdit" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="ModalEdit" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document" id = "ModalContentForm" >
                <div class="content_modal modal-content">

                </div>
            </div>
        </div>
        <script>
            $(document).ready(function () {
                

            })
        </script>
    </body>
</html>
