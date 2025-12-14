<?php /* Smarty version 2.6.18, created on 2025-12-08 14:46:45
         compiled from uptodate-step.html */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('function', 't', 'uptodate-step.html', 4, false),)), $this); ?>
<div class="install-wizard">
  <div class="upToDateStep">
    <div class="content">
      <h2><?php echo $this->_plugins['function']['t'][0](['str' => 'ProductUpToDateTitle'], $this);?>
</h2>
      <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => 'messages.html', 'smarty_include_vars' => array('aMessages' => $this->_tpl_vars['aMessages'])));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
        
      <p><?php echo $this->_plugins['function']['t'][0](['str' => 'OaUpToDate'], $this);?>
</p>
  
  
      <form action="" method="post">
          <input type="hidden" name="action" value="uptodate" >
          <div class="controls">
            <input type="submit" id="continue" value="<?php echo $this->_plugins['function']['t'][0](['str' => 'BtnContinue'], $this);?>
" name="continue"/>
          </div>    
      </form>
     </div>
    </div>
  </div>
</div>