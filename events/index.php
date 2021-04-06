<?php
/**
 * @param array $data
 * @param null $passPhrase
 * @return string
 */
function generateSignature($data, $passPhrase = null) {
    // Create parameter string
    $pfOutput = '';
    foreach( $data as $key => $val ) {
        if($val !== '') {
            $pfOutput .= $key .'='. urlencode( trim( $val ) ) .'&';
        }
    }
    // Remove last ampersand
    $getString = substr( $pfOutput, 0, -1 );
    if( $passPhrase !== null ) {
        $getString .= '&passphrase='. urlencode( trim( $passPhrase ) );
    }
    return md5( $getString );
}
// Construct variables
$cartTotal = 150.00;// This amount needs to be sourced from your application
$data = array(
    // Merchant details
    'merchant_id' => '10000100',
    'merchant_key' => '46f0cd694581a',
    'return_url' => 'https://www.pydfoundation.org/events/index.php',
    'cancel_url' => 'https://www.pydfoundation.org/events/index.php',
    'notify_url' => 'https://www.pydfoundation.org/wp-content/themes/schmidt-science-fellows/dist/scripts/notify.php',
    // Buyer details
    'name_first' => 'First Name',
    'name_last'  => 'Last Name',
    'email_address'=> 'test@test.com',
    // Transaction details
    'm_payment_id' => '1', //Unique payment ID to pass through to notify_url
    'amount' => number_format( sprintf( '%.2f', $cartTotal ), 2, '.', '' ),
    'item_name' => 'Order#1'
);

$signature = generateSignature($data);
$data['signature'] = $signature;

// If in testing mode make use of either sandbox.payfast.co.za or www.payfast.co.za
$testingMode = true;
$pfHost = $testingMode ? 'sandbox.payfast.co.za' : 'www.payfast.co.za';
$htmlForm = '<form action="https://'.$pfHost.'/eng/process" method="post">';
foreach($data as $name=> $value)
{
    $htmlForm .= '<input name="'.$name.'" type="hidden" value=\''.$value.'\' />';
}
$htmlForm .= '<button type="submit" value="Submit" /></form>';

?>

<html lang="en-US" class="no-js">

<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel='dns-prefetch' href='//cdn.jsdelivr.net'>
  <link rel='dns-prefetch' href='//fonts.googleapis.com'>
  <link href='https://fonts.gstatic.com' crossorigin="" rel='preconnect'>
<!--
  <link rel='stylesheet' id='wp-block-library-css' href='../wp-includes/css/dist/block-library/style.min.css?ver=5.4.2' type='text/css' media='all'>
  <link rel='stylesheet' id='vc_extend_style-css' href='../wp-content/plugins/visceral-vc-visceral-addons-d9d7e2b0b20b/assets/vc_extend.css?ver=5.4.2' type='text/css' media='all'>
  <link rel='stylesheet' id='vc-img-credits-css' href='../wp-content/plugins/visceral-vc-visceral-addons-d9d7e2b0b20b/assets/vc_extend.css?ver=5.4.2' type='text/css' media='all'>
  <link rel='stylesheet' id='vc-callout-box-css' href='../wp-content/plugins/visceral-vc-visceral-addons-d9d7e2b0b20b/assets/vc_extend.css?ver=5.4.2' type='text/css' media='all'>
  <link rel='stylesheet' id='vc-author-blockquote-css' href='../wp-content/plugins/visceral-vc-visceral-addons-d9d7e2b0b20b/assets/vc_extend.css?ver=5.4.2' type='text/css' media='all'>
  <link rel='stylesheet' id='et_monarch-css-css' href='../wp-content/plugins/monarch/css/style.css?ver=1.4.12' type='text/css' media='all'>

  <link rel='stylesheet' id='jsdelivr-styles-css' href='https://cdn.jsdelivr.net/npm/magnific-popup@1.1.0/dist/magnific-popup.min.css?ver=5.4.2' type='text/css' media='all'>
  <link rel='stylesheet' id='js_composer_front-css' href='../wp-content/plugins/js_composer/assets/css/js_composer.min.css?ver=6.2.0' type='text/css' media='all'>
  <link rel='stylesheet' id='bsf-Defaults-css' href='https://schmidtsciencefellows.org/wp-content/uploads/smile_fonts/Defaults/Defaults.css?ver=3.19.5' type='text/css' media='all'>
-->
  <link rel='stylesheet' id='sage/css-css' href='../wp-content/themes/schmidt-science-fellows/dist/styles/main.css?ver=1597074847' type='text/css' media='all'>

  <style type="text/css" id="et-social-custom-css"></style>
  <style type="text/css">
    .recentcomments a {
      display: inline !important;
      padding: 0 !important;
      margin: 0 !important;
    }
  </style>
  <link rel="icon" href="../wp-content/uploads/PYDF_Emblem_Transparent (1).png" sizes="32x32">
  <link rel="icon" href="../wp-content/uploads/PYDF_Emblem_Transparent (1).png" sizes="192x192">
  <link rel="apple-touch-icon" href="../wp-content/uploads/PYDF_Emblem_Transparent (1).png" sizes="180x180">
  <meta name="msapplication-TileImage" content="../wp-content/uploads/PYDF_Emblem_Transparent (1).png" sizes="270x270">

  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-TT40PMEZ45"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-TT40PMEZ45');
  </script>

  <style type="text/css" id="wp-custom-css">
    .elementor-editor-active .mfp-hide {
      display: block !important;
      opacity: 0.5;
    }
  </style>
  <style type="text/css" data-type="vc_shortcodes-custom-css">
    .vc_custom_1565726338537 {
      margin-bottom: -80px !important;
    }
  </style><noscript>
    <style>
      .wpb_animate_when_almost_visible {
        opacity: 1;
      }
    </style>
  </noscript>
  <script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
  <script>
    function SubForm() {
      $.ajax({
        url: 'https://api.apispreadsheets.com/data/10536/',
        type: 'post',
        data: $("#myForm").serializeArray(),
        success: function() {
          alert("Form Data Submitted! Thank you for your response")
        },
        error: function() {
          alert("There was an error! Please try again")
        }
      });
    }
  </script>
</head>

<body class="page-template-default page page-id-3028 page-parent cookies-not-set et_monarch about-us wpb-js-composer js-comp-ver-6.2.0 vc_responsive">
  <div class="pre-loader"></div>
  <a id="skip-to-content" href="#main-content" class="no-print" aria-label="Skip to content" title="Skip to content">Skip to content</a>

  <header class="banner">
    <div class="container">
      <div id="header-main">
        <a class="brand" href="../index.htm">
          <img id="toplogo" src="../wp-content/uploads/PYDF_Full_Transparent_White.png" alt="PYDF logo" width=180x180 />
        </a>
        <nav class="nav-primary">
          <div class="menu-primary-navigation-container">
            <ul id="menu-primary-navigation" class="nav list-inline">
              <li id="menu-item-3061" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3061"><a href="../about-us/index.htm">About Us</a></li>
              <li id="menu-item-3064" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3064"><a href="../overview/index.htm">Overview</a></li>
              <li id="menu-item-3265" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3265"><a href="../gallery/index.htm">Gallery</a></li>
              <li id="menu-item-3065" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3065"><a href="../research/index.htm">Research</a></li>
              <li id="menu-item-3066" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3066"><a href="../getinvolved/index.htm">Get Involved</a></li>
              <li id="menu-item-3063" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3063"><a href="../donate/index.htm">Donate</a></li>
              <li id="menu-item-3063" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3063"><a href="../events/index.htm">Events</a></li>
            </ul>
          </div>
        </nav>
        <label for="mobile-nav" class="screen-reader-text">mobile-nav</label>
        <label id="mobile-nav-icon" for="nav-toggle" class="icon-menu no-print" tabindex="0"></label>
      </div>
    </div>
  </header>
  <input type="checkbox" id="nav-toggle">
  <div id="mobile-nav" class="menu-primary-navigation-container">
    <ul id="menu-primary-navigation-1" class="menu">
      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3061"><a href="../about-us/index.htm">About Us</a></li>
      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3064"><a href="../overview/index.htm" aria-current="page">Overview</a></li>
      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3265"><a href="../gallery/index.htm">Gallery</a></li>
      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3065"><a href="../research/index.htm">Research</a></li>
      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3066"><a href="../getinvolved/index.htm">Get Involved</a></li>
      <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3063"><a href="../donate/index.htm">Donate</a></li>
      <li class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-6 current_page_item menu-item-3063"><a href="../events/index.htm">Events</a></li>
    </ul>
  </div>
  <div id="masthead" class="masthead img-bg" data-image-src="../wp-content/uploads/aaron-burden-6jYoil2GhVk-unsplash_gradient.jpg">
      <span class="placeholder-overlay img-bg" style="background-image: url(../wp-content/uploads/aaron-burden-6jYoil2GhVk-unsplash_gradient.jpg);"></span>

      <div class="container text-white">
        <h1 class="line-decor">Events</h1>

        <div class="row">
          <div class="column md-67">
          </div>
        </div>
      </div>
  </div>

  <div class="wrap container" role="document">
    <div class="content">
      <main id="main-content" class="main" tabindex="-1">
        <section class="vc_section vc_custom_1565726338537">
          <div class="vc_row wpb_row vc_row-fluid column-switch">
            <div class="wpb_column vc_column_container vc_col-sm-6">
              <div class="vc_column-inner">
                <div class="wpb_wrapper">
                  <div class="wpb_single_image wpb_content_element vc_align_left   img-hexagon img-hexagon--parallax">
<!--
                    <figure class="wpb_wrapper vc_figure">
                      <div class="vc_single_image-wrapper   vc_box_border_grey"><img width="1920" height="1280" src="../wp-content/uploads/SchmidtScienceFellows_0240.jpg" class="vc_single_image-img attachment-full" alt=""
                          srcset="../wp-content/uploads/SchmidtScienceFellows_0240.jpg 1920w, ../wp-content/uploads/SchmidtScienceFellows_0240-240x160.jpg 240w, ../wp-content/uploads/SchmidtScienceFellows_0240-480x320.jpg 480w, ../wp-content/uploads/SchmidtScienceFellows_0240-768x512.jpg 768w, ../wp-content/uploads/SchmidtScienceFellows_0240-1200x800.jpg 1200w"
                          sizes="(max-width: 1920px) 100vw, 1920px"></div>
                    </figure>-->
                  </div>
                </div>
              </div>
            </div>
            <form id="myForm">
                <label>Full Name</label>
                <br/>
                <input name="full_name" />
                <br/>
                <label>Email</label>
                <br/>
                <input name="email" />
                <br/>
                <label>Phone number</label>
                <br/>
                <input name="phone" />
                <br/>
                <label>PayFast Transaction number</label>
                <br/>
                <input name="phone" />
                <br/>
                <label>Slogan</label>
                <br/>
                <textarea name="slogan">
                </textarea>
                <br/>
                <br/>
              </form>

              <!--<form action="https://sandbox.payfast.co.za/eng/process" method="post">
               <input type="hidden" name="merchant_id" value="10000100">
               <input type="hidden" name="merchant_key" value="46f0cd694581a">
               <input type="hidden" name="return_url" value="https://www.pydfoundation.org/events/index.htm">
               <input type="hidden" name="cancel_url" value="https://www.pydfoundation.org/events/index.htm">
               <input type="hidden" name="notify_url" value="https://www.pydfoundation.org/wp-content/themes/schmidt-science-fellows/dist/scripts/notify.php">
               <input type="hidden" name="amount" value="150.00">
               <input type="hidden" name="item_name" value="Test Product">
               <button onclick="SubForm()">Submit</button>
             </form>-->
             <?php echo $htmlForm; ?>
          </div>
        </section>
      </main><!-- /.main -->
    </div><!-- /.content -->
  </div><!-- /.wrap -->
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="column md-25">
          <a href="index.htm">
            <img id="bottomlogo" src="../wp-content/uploads/PYDF_Emblem_Transparent (1).png" alt="PYDF logo" width=100x100 />
          </a>
          <img id="indepcodelogo" src="../wp-content/uploads/Independent Code Logo[1380].png" alt="Independent Code logo" width=100x100 />
        </div>
        <div class="column md-75">
          <nav class="footer__nav">
            <div class="menu-footer-navigation-container">
              <ul id="menu-footer-navigation" class="nav list-inline">
                <li id="menu-item-twitter" class="menu-item menu-item-twitter"><a href="https://twitter.com/pydfoundationZA" ><span class="icon-twitter"></span> Twitter</a></li>
                <li id="menu-item-facebook" class="menu-item menu-item-facebook"><a href="https://www.facebook.com/pydfoundation" ><span class="icon-facebook"></span> Facebook</a></li>
                <li id="menu-item-34" class="menu-item menu-item-34"><a href="../contact/index.htm">Contact</a></li>
                <!--<li id="menu-item-3228" class="menu-item menu-item-3228"><a href="legal/index.htm">Legal</a></li>-->
              </ul>
            </div>
          </nav>
          <hr>
          <p class="footer__copyright"> 2020 Positive Youth Development Foundation <br> RSA Department of Social Development Non-Profit Organisation. Reg Number: 248-326 NPO.</p>
        </div>
      </div>
    </div>
  </footer>


</body>

</html>
