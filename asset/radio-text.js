(function(w){

    var QsRadioText = function(el){
        this.el = el;
        this._init();
    };

    QsRadioText.prototype = {
        _init: function(){
            this.input = document.createElement('input');
            this.input.type = 'hidden';
            this.input.name = this.el.getAttribute('name');
            this.input.value = this.el.getAttribute('value');

            this.el.appendChild(this.input);

            this._createDom();
        },
        _createDom: function(){
            var self = this;

            this.option = JSON.parse(this.el.getAttribute('option'));

            var value = JSON.parse(this.input.value || '[]');


            this.option.forEach(function(element){
                var currentVal = value.find(function(val){
                    return val.key === element.key;
                })

                var container = self._createItem(element, currentVal);
                self.el.appendChild(container);
            });
        },
        _createItem: function(element, value){
            var self = this;

            var container = document.createElement('div');
            container.className = "qs-radio-text-container";
            this.el.appendChild(container);

            var box = document.createElement('div');
            box.className = "qs-radio-text-box";
            container.appendChild(box);

            var radioDiv = document.createElement('div');

            radioDiv.className = 'qs-radio-text-div';
            if(value && value.checked){
                radioDiv.className = "qs-radio-text-div checked";
            }
            box.appendChild(radioDiv);

            var label = document.createElement('span');
            label.className = 'qs-radio-text-label';
            label.innerText = element.title;

            box.appendChild(label);

            var input;
            if(element.need_text){
                input = document.createElement('input');
                input.type = 'text';
                input.className = 'qs-radio-text-input';
                if(value && value.checked){
                    input.className = "qs-radio-text-input checked";
                }
                if(value && value.text){
                    input.value = value.text;
                }
                container.appendChild(input);

                input.addEventListener('change', function(e){
                    self._dump(element.key, e.target.value);
                })
            }

            box.addEventListener('click', function(ev){
                var checkedDivs = document.querySelectorAll('.qs-radio-text-div.checked');

                for (var i = 0; i < checkedDivs.length; i++) {
                    checkedDivs[i].className = 'qs-radio-text-div';
                }

                radioDiv.className = 'qs-radio-text-div checked';
                if(element.need_text){
                    input.className = 'qs-radio-text-input checked';
                    self._dump(element.key, input.value);
                }
                else{
                    self._dump(element.key);
                }
            });

            return container;
        },
        _dump: function(key, text){
            var newVal = {};
            newVal['key'] = key;

            newVal['checked'] = true;

            if(!!text){
                newVal['text'] = text;
            }

            this.input.value = JSON.stringify([newVal]);
        },
        _toArray: function(classList){
            var arr = [];
            for(var i = 0; i < classList.length; i++){
                arr.push(classList[i]);
            }
            return arr;
        }
    }

    w.QsRadioText = QsRadioText;

}(window));