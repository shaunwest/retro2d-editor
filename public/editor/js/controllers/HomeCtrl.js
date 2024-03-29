/**
 * Created by shaun on 3/16/14.
 */

(function() {
  'use strict';

  angular.module('editor.controllers')
    .controller('HomeCtrl', ['$scope', 'configService', 'sourcesList', 'tileSetService', 'gameId',
      function($scope, configService, sourcesList, tileSetService, gameId) {
        init();
        loadConfig();

        function init() {
          $scope.sourcesWindow = {
            open: function() {
              sourcesList(gameId).then(function(data) {
                $scope.remoteSources = data;
                $scope.modal.center().open();
              });
            },
            close: function() {
              // close
            }
          };

          $scope.editorEnabled = false;
          $scope.addSource = addSource;
        }

        function addSource(source) {
          var gameConfig = $scope.gameConfig,
            sources = gameConfig.hasOwnProperty('sources') ? gameConfig['sources'] : {};

          if(sources.hasOwnProperty(source)) {
            console.log("Updated: " + source);
          } else {
            console.log("Added: " + source);
          }

          sources[source] = source;
          gameConfig.sources = sources;
        }

        function loadLayers(level) {

        }

        function loadConfig() {
          configService.getConfig().then(
            function(config) {
              $scope.selectedTileSetId = config.tileSets[0].id;
              $scope.editorEnabled = true;
              $scope.selectedLevelId = config.levels[0].id;
            },
            function(reason) {
              console.log("ERROR: " + reason);
              $scope.editorEnabled = true;
            }
          );
        }
      }
    ]);
})();

