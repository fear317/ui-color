var app = angular.module('controllers.rgbtoui', ['ngRoute', 'ui.bootstrap', 'colorpicker.module']);

app.controller("RgbToUICtrl", function(appConfig, $scope, $filter, $rootScope) {

    $scope.title = "RGB to UIColor Converter";

    // Roll Tide
    $scope.rgbValid = true;
    $scope.alphaValid = true;
    $scope.alpha = "1.0";

    $scope.color = {
        "rgb": "",
        "r": "",
        "g": "",
        "b": "",
    };

    function convertRgbToUi(color) {

        $scope.color.rgb = color;
        $scope.color.r = color.replace(/^rgba?\(|\s+|\)$/g,'').split(',')[0];
        $scope.color.g = color.replace(/^rgba?\(|\s+|\)$/g,'').split(',')[1];
        $scope.color.b = color.replace(/^rgba?\(|\s+|\)$/g,'').split(',')[2];

        $scope.uiColor = {
            "r": ($scope.color.r / 255).toFixed(2),
            "g": ($scope.color.g / 255).toFixed(2),
            "b": ($scope.color.b / 255).toFixed(2),
        };

        console.log($scope.color);

        $rootScope.$broadcast('ColorChanged', $scope.color);

    }

    $scope.$watch('rgb', function(newVal, oldval){
        if (newVal) {
            convertRgbToUi(newVal);
            updateCopyText();
        } else {
            $rootScope.$broadcast('ColorChanged', appConfig.themePrimary);
        }
    }, true);

    function updateCopyText() {
        $scope.copyObjectiveC = "[UIColor colorWithRed:" + $scope.uiColor.r + " green:" + $scope.uiColor.g + " blue:" + $scope.uiColor.b + " alpha:" + $scope.alpha + "];";
        $scope.copySwift = "UIColor(red:" + $scope.uiColor.r + ", green:" + $scope.uiColor.g + ", blue:" + $scope.uiColor.b + ", alpha:" + $scope.alpha + ")";
    }


});