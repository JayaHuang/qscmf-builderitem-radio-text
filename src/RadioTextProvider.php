<?php
namespace BuilderItem\RadioText;

use Bootstrap\Provider;
use Bootstrap\RegisterContainer;
use BuilderItem\RadioText\FormType\RadioText\RadioText;

class RadioTextProvider implements Provider{

    public function register(){
        RegisterContainer::registerFormItem('radio_text', RadioText::class);
        RegisterContainer::registerListColumnType('radio_text', \BuilderItem\RadioText\ColumnType\RadioText\RadioText::class);

        RegisterContainer::registerSymLink(WWW_DIR . '/Public/radio-text', __DIR__ . '/../asset');
    }
}