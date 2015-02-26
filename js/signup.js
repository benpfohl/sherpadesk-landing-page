angular.module('app', ['ui.bootstrap'])
    .controller('MainCtrl', function($rootScope, $scope, $http) {
        var apiUrl = "http://api.beta.sherpadesk.com/organizations"
        $scope.signUp = {
            companyName: '',
            email: '',
            pUrl: '',
            firstName: '',
            lastName: '',
            password: '',
            password2: '',
            hearAboutUs: '',
            stepOneComplete: false
        };

        $scope.signUpNew = angular.copy($scope.signUp);

        $scope.goNextStep = function(){
            if($scope.getstarted.company.$valid
                && $scope.getstarted.email.$valid
                && $scope.getstarted.url.$valid)
            {
                $scope.signUp.stepOneComplete = true;
            }
        };

        $scope.createAccount = function(){
            alert('Creating account after validation here')
            $scope.signUp.stepOneComplete = false;
            //reset form
            $scope.signUp = $scope.signUpNew;
        };


        //temp
        $scope.checkUrl = function(){
            return
        };

        $scope.checkUrlName = function(name){
            var checkUrl = apiUrl + '/organizations';

            var data = {
                name: encodeURIComponent(name),
                format: 'json',
                is_force_registration: false
            };

            var req = {
                method: 'POST',
                url: checkUrl,
                headers: {
                    'Content-Type': 'text/plain'
                },
                data: data
            };

            $http(req)
                .success(function(data, status, headers, config) {

                })
                .error(function(data, status, headers, config) {

                });
        };

        $scope.$watch('signUp.companyName', function(newVar, oldVar){
            $scope.signUp.pUrl = newVar.toString().toLowerCase().replace(/\s+/g, '');

            $scope.checkUrlName(newVar);
        });

    })
    .directive('validatePasswordCharacters', function() {
        var REQUIRED_PATTERNS = [
            /\d+/,    //numeric values
            /[a-z]+/, //lowercase values
            /[A-Z]+/, //uppercase values
            /\W+/,    //special characters
            /^\S+$/   //no whitespace allowed
        ];
        return {
            require : 'ngModel',
            link : function($scope, element, attrs, ngModel) {
                ngModel.$validators.passwordCharacters = function(value) {
                    var status = true;
                    angular.forEach(REQUIRED_PATTERNS, function(pattern) {
                        status = status && pattern.test(value);
                    });
                    return status;
                };
            }
        }
    })
    .directive('urlValidator', ['$http', function($http) {
        return {
            require : 'ngModel',
            link : function($scope, element, attrs, ngModel) {
                ngModel.$asyncValidators.urlAvailable = function(username) {
                    return true;
                };
            }
        }
    }]);