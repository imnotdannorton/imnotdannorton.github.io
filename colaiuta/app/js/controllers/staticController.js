'use strict';

/* Controllers */

angular.module('vaterDotcom').controller('staticController', function($scope) {
  	$scope.features = ['WOO', 'HEY NOW', 'WHATS THAT?'];
  	$scope.currentStep = 0;
  	$scope.nextItem = function(){
      if ($scope.currentStep+1 < $scope.steps.length){
       $scope.currentStep = $scope.currentStep+1; 
      }
      $scope.manuStep = $scope.steps[$scope.currentStep];
    }
    $scope.prevItem = function(){
      if ($scope.currentStep > 0){
       $scope.currentStep = $scope.currentStep-1; 
      }
      $scope.manuStep = $scope.steps[$scope.currentStep];
    }
  	$scope.steps = [

		{
			img:"http://vater.s3.amazonaws.com/assets/dowels.jpg",
			title:"Step #1", 
			text:'Each Vater Stick starts from a raw dowel. Vater accepts only the highest quality Hickory and Maple dowels with a particular moisture content reading from wood suppliers.'
		},

		{
			img:"http://vater.s3.amazonaws.com/assets/lathe.jpg",
			title:"Step #2", 
			text:'Vater\'s sticks are cut on back-knife lathes, set up and overseen by Ron Vater. Each stick model is turned from it\'s own steel knife designed to the specifications and measurements of that model.'
		},


		{
			img:"http://vater.s3.amazonaws.com/assets/sander.jpg",
			title:"Step #3", 
			text:'Each stick is then put through a delicate sanding process. With machines custom designed by Vater, each stick is evenly sanded with impeccable consistency.'
		},

		{
		img:"http://vater.s3.amazonaws.com/assets/woodtips.jpg" ,
		title:"Step #4", 
		text:'The wood tips are shaped using an extremely accurate automated process. Each stick is inserted into a cylinder in which a size/shape specific Knife shapes the tip. The stick is then released leaving a perfectly shaped tip every time.'
		},

		{
			img:"http://vater.s3.amazonaws.com/assets/nylontips.jpg",
			title:"Step #5", 
			text:'Nylon tips are applied using a custom designed automated machine built exclusivley for Vater. Each stick spins while glue is applied evenly around the wood to nylon tip contact surface area. The tip is then forced on the stick with a great amount of air compression leaving it permanently "locked" on the stick.'
		},
		{
			img:"http://vater.s3.amazonaws.com/assets/tumbler.jpg",
			title:"Step #6", 
			text:'Sticks are then put in a revolving tumbler that evenly applies the sealer and finish coats. This process leaves every stick with that famous Vater finish.'
		},

		{
			img:"http://vater.s3.amazonaws.com/assets/piperoll.jpg",
			title:"Step #7", 
			text:'Each stick is then rolled down a set of steel pipes by a quality control expert. Sticks that are warped or have a mineral streak / visual blemish are then taken out and become 2nd quality sticks. The sticks that make it through are considered 1st quality... for now.'
		},

		{
			img:"http://vater.s3.amazonaws.com/assets/rollvater.jpg",
			title:"Step #8", 
			text:'Alan Vater then personally re-rolls each and every stick that made it through the first rolling process on a pure black surface. Alan removes every stick that he comes across that isn\'t 100% straight'
		},
		{
			img:"http://vater.s3.amazonaws.com/assets/labeler.jpg",
			title:"Step #9", 
			text:'Now worthy of the Vater name, the sticks are then labeled on a pad-printing machine. Silicone pads apply pressure to a self inking metal plate etched with the vater logo and model name, leaving the image on the pads. The pads then come down and apply the image to the stick.'
		},

		{
			img:"http://vater.s3.amazonaws.com/assets/pitchmatch.jpg",
			title:"Step #10", 
			text:'Each stick is then put through Vater\'s computer pitch and weight matching system. The pitch and weight of each stick is recorded and the stick is placed into a designated bin. Each stick within a specific bin will have the same pitch and weight as the others in the same bin.'
		},


		{
			img:"http://vater.s3.amazonaws.com/assets/colormatch.jpg" ,
			title:"Step #11", 
			text:'The sticks from each individual bin are then color matched in bar-coded sleeves, leaving a perfectly pitch and weight matched pair.'
		},

		{
			img:"http://vater.s3.amazonaws.com/assets/plasticwrap.jpg",
			title:"Step #12", 
			text:'"Bricks" of 12 pair are then shrink wrapped in plastic. This dramatically decreases the potential loss of moisture content in the sticks, keeping them straight. The sticks are now ready to be put in stock and shipped.'
		}
	];
	$scope.manuStep = $scope.steps[$scope.currentStep];
});
