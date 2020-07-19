
const router = require('express').Router();
const Course = require('../../models').Course;

router.get('', (req, res) => {

	Course.findAll().then(courses => {
		res.json(courses);
    }, err => {
        res.send(err);
	});
});

router.get('/:courseId', (req, res) => {

	Course.findByPk(req.params.courseId).then(course => {
		if(course != null){
			res.json(course);
		}
		else{
			res.sendStatus(404);
		}
	}, err => {
		res.send(err)
	});
});

router.post('', (req, res) => {

	Course.create(req.body).then(course => {
		if(course != null){
			res.json(course);
		}
		else{
			res.sendStatus(500);
		}
	}, err => {
		res.send(err)
	});
});

router.put('', (req, res) => {

	Course.update(req.body, {where: {id: req.body.id} })
	.then(() => {return Course.findByPk(req.body.id)})
	.then(course => {
		if(course != null){
			res.json(course);
		}
		else{
			res.sendStatus(500);
		}
	}, err => {
		res.send(err)
	});
});
  

module.exports = router;
