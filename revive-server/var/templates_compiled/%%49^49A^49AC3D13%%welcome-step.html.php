<?php /* Smarty version 2.6.18, created on 2025-12-08 14:40:46
         compiled from welcome-step.html */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('function', 'ox_wizard_steps', 'welcome-step.html', 3, false),array('function', 't', 'welcome-step.html', 6, false),)), $this); ?>
<div class="install-wizard">
  <div class="welcomeStep">
    <?php echo $this->_plugins['function']['ox_wizard_steps'][0](['steps' => $this->_tpl_vars['oWizard']->getSteps(),'current' => $this->_tpl_vars['oWizard']->getCurrentStep()], $this);?>


    <div class="content">
      <h2><?php echo $this->_plugins['function']['t'][0](['str' => 'WelcomeTitle'], $this);?>
 <?php echo $this->_tpl_vars['oxVersion']; ?>
</h2>

      <p><?php if ($this->_tpl_vars['isUpgrade']): ?><?php echo $this->_plugins['function']['t'][0](['str' => 'UpgradeIntro'], $this);?>
<?php else: ?><?php echo $this->_plugins['function']['t'][0](['str' => 'InstallIntro'], $this);?>
<?php endif; ?></p>
      <p><?php echo $this->_plugins['function']['t'][0](['str' => 'InstallerHelpIntro'], $this);?>
</p>
      <p><?php echo $this->_plugins['function']['t'][0](['str' => 'TermsIntro'], $this);?>
</p>

      <div class="terms">
        <pre>
<?php echo $this->_tpl_vars['LICENSE']; ?>

        </pre>
      </div>

      <form action="" method="post">
          <input type="hidden" name="action" value="welcome" >
          <div class="controls">
            <input type="submit" id="continue" value="<?php echo $this->_plugins['function']['t'][0](['str' => 'BtnAgree'], $this);?>
" name="continue"/>
          </div>
      </form>
    </div>
  </div>
</div>

<script type="text/javascript">
<!--
<?php echo '
  $(document).ready(function() {
    $(".welcomeStep").welcomeStep({
        '; ?>

            'message' : '<?php echo $this->_tpl_vars['loaderMessage']; ?>
'
        <?php echo '
    });
  });
'; ?>

-->
</script>