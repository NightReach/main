<?php /* Smarty version 2.6.18, created on 2025-12-09 10:25:27
         compiled from /var/www/html/lib/templates/admin/form/custom-date-campaign-date-limit-set-note.html */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('function', 't', '/var/www/html/lib/templates/admin/form/custom-date-campaign-date-limit-set-note.html', 14, false),)), $this); ?>

<span class="link" help="help-date-disabled"><span class="icon icon-info"><?php echo $this->_plugins['function']['t'][0](['str' => 'WhyDisabled'], $this);?>
</span></span>
<div class="hide" id="help-date-disabled" style="height: auto; width: 290px;">
    <?php echo $this->_plugins['function']['t'][0](['str' => 'CannotSetBothDateAndLimit'], $this);?>

</div>