<?php
namespace BuilderItem\RadioText\FormType\RadioText;

use Illuminate\Support\Str;
use Think\View;
use Qscmf\Builder\FormType\FormType;

class RadioText implements FormType {

     public function build(array $form_item) : string{
        $view = new View();
        $view->assign('form', $form_item);
        $view->assign('gid', Str::uuid()->getHex());
        $content = $view->fetch(__DIR__ . '/radio_text.html');
        return $content;
    }
}