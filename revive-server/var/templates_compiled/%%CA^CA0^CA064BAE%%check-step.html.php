<?php /* Smarty version 2.6.18, created on 2025-12-08 14:40:57
         compiled from check-step.html */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('function', 'ox_wizard_steps', 'check-step.html', 3, false),array('function', 't', 'check-step.html', 6, false),array('modifier', 'count', 'check-step.html', 32, false),)), $this); ?>
<div class="install-wizard">
  <div class="checkStep">
    <?php echo $this->_plugins['function']['ox_wizard_steps'][0](['steps' => $this->_tpl_vars['oWizard']->getSteps(),'current' => $this->_tpl_vars['oWizard']->getCurrentStep()], $this);?>

  
    <div class="content">
    <h2><?php echo $this->_plugins['function']['t'][0](['str' => 'SystemCheck'], $this);?>
</h2>
    <p><?php echo $this->_plugins['function']['t'][0](['str' => 'SystemCheckIntro'], $this);?>
</p>
    
    <div class="messagePlaceholder messagePlaceholderStatic" <?php if (! $this->_tpl_vars['needsRetry']): ?>style="display:none"<?php endif; ?>>
      <div class="message localMessage">
        <div class="panel error">
          <div class="icon"></div><p><?php echo $this->_plugins['function']['t'][0](['str' => 'FixErrorsBeforeContinuing'], $this);?>
</p>
          <div class="topleft"></div>
          <div class="topright"></div>
          <div class="bottomleft"></div>
          <div class="bottomright"></div>
        </div>
      </div>
    </div>    
    
    <ul class="syscheck">
      <?php $_from = $this->_tpl_vars['aChecks']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['section']):
?>
      <li class="checkSection <?php if ($this->_tpl_vars['section']['hasError']): ?>hasError<?php elseif ($this->_tpl_vars['section']['hasWarning']): ?>hasWarning<?php endif; ?>">
        <h4 class="header <?php if ($this->_tpl_vars['section']['hasError']): ?>error<?php endif; ?>"><span class="detail-control"><a href="#" class="detailed hide"><?php echo $this->_plugins['function']['t'][0](['str' => 'SyscheckSeeFullReport'], $this);?>
</a> <a href="#" class="compact hide"><?php echo $this->_plugins['function']['t'][0](['str' => 'SyscheckSeeShortReport'], $this);?>
</a></span><span class="inlineIcon <?php if ($this->_tpl_vars['section']['hasError']): ?>iconCheckErr<?php else: ?>iconCheckOK<?php endif; ?>"><?php echo $this->_tpl_vars['section']['header']; ?>
</span></h4>
        
                <ul class="check-list">
        <?php if ($this->_tpl_vars['section']['errors']): ?> 
          <li class="section-error hasError">
            <div class="messageContainer">
              <div class="body error">
                  <?php if (count($this->_tpl_vars['section']['errors']) > 1): ?>
                    <ol>
                    <?php $_from = $this->_tpl_vars['section']['errors']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['error']):
?>
                        <li>- <?php echo $this->_tpl_vars['error']; ?>
</li>
                    <?php endforeach; endif; unset($_from); ?>
                    </ol>
                  <?php else: ?>
                    <?php $_from = $this->_tpl_vars['section']['errors']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['error']):
?>                       <?php echo $this->_tpl_vars['error']; ?>

                    <?php endforeach; endif; unset($_from); ?>
                  <?php endif; ?>
              </div>
            </div>
          </li>
        <?php endif; ?>
        <?php if ($this->_tpl_vars['section']['warnings']): ?>
          <li class="section-warning hasWarning">
            <div class="messageContainer">
              <div class="body warning">
                  <?php if (count($this->_tpl_vars['section']['warnings']) > 1): ?>
                    <ol>
                    <?php $_from = $this->_tpl_vars['section']['warnings']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['warning']):
?>
                        <li>- <?php echo $this->_tpl_vars['warning']; ?>
</li>
                    <?php endforeach; endif; unset($_from); ?>
                    </ol>
                  <?php else: ?>
                    <?php $_from = $this->_tpl_vars['section']['warnings']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['warning']):
?>                       <?php echo $this->_tpl_vars['warning']; ?>

                    <?php endforeach; endif; unset($_from); ?>
                  <?php endif; ?>
              </div>
            </div>
          </li>
        <?php endif; ?>
        <?php if ($this->_tpl_vars['section']['infos']): ?>
          <li class="section-info">
            <div class="messageContainer">
              <div class="body info">
                  <?php if (count($this->_tpl_vars['section']['infos']) > 1): ?>
                    <ol>
                    <?php $_from = $this->_tpl_vars['section']['infos']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['info']):
?>
                        <li>- <?php echo $this->_tpl_vars['info']; ?>
</li>
                    <?php endforeach; endif; unset($_from); ?>
                    </ol>
                  <?php else: ?>
                    <?php $_from = $this->_tpl_vars['section']['infos']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['info']):
?>                       <?php echo $this->_tpl_vars['info']; ?>

                    <?php endforeach; endif; unset($_from); ?>
                  <?php endif; ?>
              </div>
            </div>
          </li>
        <?php endif; ?>
        </ul>
        
        
        <div class="tableContainer">
          <table>
              <thead>
                  <tr>
                      <th class="first name"><?php echo $this->_plugins['function']['t'][0](['str' => 'SyscheckName'], $this);?>
</th>
                      <th class="value"><?php echo $this->_plugins['function']['t'][0](['str' => 'SyscheckValue'], $this);?>
</th>
                      <th class="status"><?php echo $this->_plugins['function']['t'][0](['str' => 'SyscheckStatus'], $this);?>
</th>
                  </tr>
              </thead>
              
              <tbody>
                       
                <?php $_from = $this->_tpl_vars['section']['checks']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['check']):
?>
                <tr class="checkItem <?php if ($this->_tpl_vars['check']['hasError']): ?>check-error hasError<?php elseif ($this->_tpl_vars['check']['hasWarning']): ?>check-warning hasWarning<?php endif; ?>">
                  <td class="first">
                    <span class="name"><?php echo $this->_tpl_vars['check']['name']; ?>
</span>
                    <?php if ($this->_tpl_vars['check']['hasError'] && $this->_tpl_vars['check']['errors']): ?>
                        <?php $this->assign('messages', $this->_tpl_vars['check']['errors']); ?>
                    <?php elseif ($this->_tpl_vars['check']['hasWarning'] && $this->_tpl_vars['check']['warnings']): ?>
                        <?php $this->assign('messages', $this->_tpl_vars['check']['warnings']); ?> 
                    <?php elseif ($this->_tpl_vars['check']['hasInfo'] && $this->_tpl_vars['check']['infos']): ?>
                        <?php $this->assign('messages', $this->_tpl_vars['check']['infos']); ?>
                    <?php else: ?>    
                        <?php $this->assign('messages', null); ?>
                    <?php endif; ?>                    
                      
                    <?php if ($this->_tpl_vars['messages']): ?>
                      <div class="message">
                        <?php if (count($this->_tpl_vars['messages']) > 1): ?>
                          <ol>
                          <?php $_from = $this->_tpl_vars['messages']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['message']):
?>
                              <li>- <?php echo $this->_tpl_vars['message']; ?>
</li>
                          <?php endforeach; endif; unset($_from); ?>
                          </ol>
                        <?php else: ?>
                          <?php $_from = $this->_tpl_vars['messages']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['message']):
?>                             <?php echo $this->_tpl_vars['message']; ?>

                          <?php endforeach; endif; unset($_from); ?>
                        <?php endif; ?>
                      </div>
                    <?php endif; ?>
                  </td>
  
                  <td class="value"><?php echo $this->_tpl_vars['check']['value']; ?>
</td>  
                  
                  <td class="status" title="<?php if ($this->_tpl_vars['check']['hasError']): ?><?php echo $this->_plugins['function']['t'][0](['str' => 'Error'], $this);?>
<?php elseif ($this->_tpl_vars['check']['hasWarning']): ?><?php echo $this->_plugins['function']['t'][0](['str' => 'Warning'], $this);?>
<?php else: ?><?php echo $this->_plugins['function']['t'][0](['str' => 'OK'], $this);?>
<?php endif; ?>">
                      <span class="inlineIcon <?php if ($this->_tpl_vars['check']['hasError']): ?>iconCheckErr<?php elseif ($this->_tpl_vars['check']['hasWarning']): ?>iconCheckWarn<?php else: ?>iconCheckOK<?php endif; ?>">&nbsp;</span>
                  </td>  
                </tr>
                <?php endforeach; endif; unset($_from); ?>
              </tbody>
          </table>
        </div>
      </li>
      <?php endforeach; endif; unset($_from); ?>      
    </ul>
    
    <form action="" method="post" id="checkForm">
        <input type="hidden" name="action" value="check" >
        <div class="controls">
          <input type="submit" <?php if ($this->_tpl_vars['needsRetry']): ?>name="retry" id="retry"<?php else: ?>name="continue" id="continue"<?php endif; ?> value="<?php if ($this->_tpl_vars['needsRetry']): ?><?php echo $this->_plugins['function']['t'][0](['str' => 'BtnRetry'], $this);?>
<?php else: ?><?php echo $this->_plugins['function']['t'][0](['str' => 'BtnContinue'], $this);?>
<?php endif; ?>"/>
        </div>    
    </form>

    </div>
  </div>
</div>


<script type="text/javascript">
<!--
<?php echo '
  $(document).ready(function() {
    $(".checkStep").checkStep({
        '; ?>

        'message' : '<?php echo $this->_tpl_vars['loaderMessage']; ?>
'
        <?php echo ' 
    });
  });  
'; ?>

-->
</script>