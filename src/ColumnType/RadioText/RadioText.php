<?php
namespace BuilderItem\RadioText\ColumnType\RadioText;

use Qscmf\Builder\ColumnType\ColumnType;
use Think\View;

class RadioText extends ColumnType{

    public function build(array &$option, array $data, $listBuilder) : string{
        $component_option = $option['value'];
        $value = $data[$option['name']];
        $value = json_decode(htmlspecialchars_decode($value), true);
        $show_data = [];

        foreach($component_option as $v){
            foreach($value as $vo){
                if($v['key'] == $vo['key']){
                    $str = $v['title'];

                    if($v['need_text'] && isset($vo['text']) && !!$vo['text']){
                        $str .= '：' . $vo['text'];
                    }

                    $show_data[] = $str;
                }

            }
        }

        $view = new View();
        $view->assign('data', $show_data);
        $content = $view->fetch(__DIR__ . '/radio_text.html');
        return $content;
    }
}