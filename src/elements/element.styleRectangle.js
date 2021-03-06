'use strict';

import Chart from 'chart.js';
import styleHelpers from '../helpers/helpers.style';

var Rectangle = Chart.elements.Rectangle;

export default Rectangle.extend({

	draw: function() {
		var me = this;
		var args = arguments;
		var chart = me._chart;
		var vm = me._view;
		var bevelExtra = styleHelpers.opaque(vm.borderColor) && vm.borderWidth > 0 ? vm.borderWidth / 2 : 0;

		var drawCallback = function() {
			Rectangle.prototype.draw.apply(me, args);
		};

		styleHelpers.drawShadow(chart, vm.shadowOffsetX, vm.shadowOffsetY,
			vm.shadowBlur, vm.shadowColor, drawCallback, true);

		if (styleHelpers.opaque(vm.backgroundColor)) {
			styleHelpers.drawBackground(vm, drawCallback);
			styleHelpers.drawBevel(chart, vm.bevelWidth + bevelExtra,
				vm.bevelHighlightColor, vm.bevelShadowColor, drawCallback);
		}

		styleHelpers.drawInnerGlow(chart, vm.innerGlowWidth, vm.innerGlowColor,
			vm.borderWidth, drawCallback);
		styleHelpers.drawOuterGlow(chart, vm.outerGlowWidth, vm.outerGlowColor,
			vm.borderWidth, drawCallback);

		styleHelpers.drawBorder(vm, drawCallback);
	}
});
