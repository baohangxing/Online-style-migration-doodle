(function ($) {

    $.fn.wizzy = function (options) {

        let settings = $.extend({
            stepNumbers: false,
            progressType: 'fill',
        }, options);

        return this.each(function () {
            let elem = $(this);
            let nav = elem.find('.wz-header nav');
            let navigator = elem.find('.wz-navigator');
            let content = elem.find('.wz-inner');

            let btnNext = '<a href="#" class="btn btn-primary right" data-action="next">Next <i class="fas fa-angle-right"></i></a>';
            let btnBack = '<a href="#" class="btn btn-default left" data-action="back"><i class="fas fa-angle-left"></i> Back</a>';
            let btnFinish = '<a href="#" class="btn btn-success right" data-action="finish">Finish <i class="fas fa-check"></i></a>';

            let step_links = elem.find('nav a').toArray();
            let step_count = step_links.length;
            let step_status = new Array(step_count);
            let step_content = elem.find('.wz-step').toArray();
            let link_width = $(step_links[0]).width();
            let step = 0;
            let ok = false;

            function init() {
                for (i = 1; i < step_count; i++) {
                    step_status[i] = 0;
                }
                step_status[0] = 1;
                updateTemplate();
                render();
            }

            function moveProgress(step) {
                if (settings.progressType == 'fill') {
                    let progressWidth = link_width * (step + 1);
                    nav.find('.progress').css({'width': progressWidth + 'px'});
                }
                if (settings.progressType == 'slide') {
                    nav.find('.progress').css({'width': link_width + 'px'});
                    let distance = link_width * (step);
                    nav.find('.progress').css({'left': distance + 'px'});
                }

            }

            function updateTemplate() {
                nav.append('<div class="progress"></div>');
                moveProgress(step);
                step_links.forEach(element => {
                    $(element).wrapInner('<span></span>');
                });
            }

            /**
             *
             * @param {boolean} show
             */
            function loader(show) {
                let loader = '<div class="loading" style="margin:  300px 500px;font-size: 30px" >请等待。。。</div>';
                if (show === true) { //Show Loader Spinner
                    content.fadeOut(400, function () {
                        elem.addClass('progress');
                        setTimeout(() => {
                            elem.append(loader);
                        }, 500);
                    });
                } else {
                    elem.find('.loading').remove();
                    elem.removeClass('progress');
                    let showfinal = '<div style="margin-left: 300px;margin-top: 50px"><img src="../' + pic_fl + '" style="width: 600px ;height: 400px"></div>';
                    elem.append(showfinal);
                }
            }

            /**
             *
             * @param {string} action
             */
            function react(action) {

                if (step >= 0 && step < step_count) {
                    if (action === 'next') {
                        step_status[step++] = 1;
                        if (step_status[step] === 0) {
                            step_status[step] = 1;
                        }
                        render(step);
                    } else if (action == 'back') {
                        step--;
                        render(step);
                    } else if (action == 'finish') {
                        if (canchange()) {


                            setInterval(function () {
                                changeisfinal()
                            }, 1000);
                            getfinalimage();
                            // loader(true);
                            // setTimeout(() => {
                            //     loader(false);
                            // }, 3000);
                        } else {
                            alert("请在三个部分图片都选择或是绘制后，在选择最后一步！！！")
                        }
                    }
                }

            }

            function changeisfinal() {
                console.log("2:" + isfinish);
                if (isfinish) {
                    if (ok) {
                    } else {
                        loader(false);
                        ok = true;
                    }
                } else {
                    loader(true);

                }
            }

            /**
             * Render out the content
             */
            function render() {
                navigator.html('');

                if (step === 0) {
                    navigator.append(btnNext);
                } else if (step === step_count - 1) {
                    navigator.append(btnBack + btnFinish);
                } else {
                    navigator.append(btnBack + btnNext);
                }

                elem.find('nav a').removeClass('active completed');
                for (i = 0; i < step; i++) {
                    $(step_links[i]).addClass('completed');
                }
                $(step_links[i]).addClass('active');

                elem.find('.wz-body .wz-step').removeClass('active');
                $(step_content[step]).addClass('active');

                moveProgress(step);
            }

            /**
             * Click events
             */
            $(elem).on('click', '.wz-navigator .btn', function (e) {
                e.preventDefault();
                let action = $(this).data('action');
                react(action);
            });

            $(elem).on('click', 'nav a', function (e) {
                e.preventDefault();
                let step_check = $(this).index();
                if (step_status[step_check] === 1 || step_status[step_check] === 2) {
                    step = $(this).index();
                    render();
                } else {
                    console.log('Check errors');
                }
            });


            init();
        });
    }

}(jQuery));