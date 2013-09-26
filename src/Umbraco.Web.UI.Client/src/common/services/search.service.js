angular.module('umbraco.services')
.factory('searchService', function ($q, $log, entityResource) {
	var m = {results: []};
	return {
		results: m,
		search: function(term){
			m.results.length = 0;

			var deferred = $q.defer();
			var i = 0;

			entityResource.search(term, "Document").then(function(data){
				$log.log(data);

				m.results.push({
					icon: "icon-document",
					editor: "content/content/edit/",
					matches: data
				});
				i++;

				//deferred.notify(results);


				if(i === 2){
					deferred.resolve(m);
				}
			});

			entityResource.search(term, "Media").then(function(data){
				$log.log(data);

				m.results.push({
					icon: "icon-picture",
					editor: "media/media/edit/",
					matches: data
				});
				i++;

				if(i === 2){
					deferred.resolve(m);
				}
			});

			return deferred.promise;
		},
		
		setCurrent: function(sectionAlias){
			currentSection = sectionAlias;	
		}
	};
});