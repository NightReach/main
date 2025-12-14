<?php /* Smarty version 2.6.18, created on 2025-12-09 10:25:27
         compiled from /var/www/html/lib/templates/admin/form/custom-campaign-remaining-conv.html */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('function', 't', '/var/www/html/lib/templates/admin/form/custom-campaign-remaining-conv.html', 15, false),)), $this); ?>

<span id="conversions_remaining_span" style="display: none">
    <?php echo $this->_plugins['function']['t'][0](['str' => 'ConversionsRemaining'], $this);?>
:<span id='conversions_remaining_count'><?php echo $this->_tpl_vars['_e']['vars']['conversionsRemaining']; ?>
</span>
</span>