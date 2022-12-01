const Course = require("../models/course");
const image = require("../utils/image");

async function createCourse(req, res) {
    const course = new Course(req.body);

    const imagePath = image.getFilePath(req.files.miniature);
    course.miniature = imagePath;

    course.save((err, courseStored) => {
        if(err) {
            res.status(400).send({msg: "Error al crear curso."});
        } else {
            res.status(201).send(courseStored);
        }
    });
}

function getCourses(req, res) {
    const {page = 1, limit = 10} = req.query;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit)
    };

    Course.paginate({}, options, (err, courses) => {
        if(err) {
            res.status(400).send({msg: "Error al obtener cursos."});
        } else {
            res.status(200).send(courses);
        }
    });
}

function updateCourse(req, res) {
    const {id} = req.params;
    const courseData = req.body;

    if(req.files.miniature) {
        const imagePath = image.getFilePath(req.files.miniature);
        courseData.miniature = imagePath;
    }

    Course.findByIdAndUpdate({_id: id}, courseData, (err) => {
        if(err) {
            res.status(400).send({msg: "Error al actualizar curso"});
        } else {
            res.status(200).send({msg: "Curso actualizado correctamente."});
        }
    });
}

function deleteCourse(req, res) {
    const {id} = req.params;

    Course.findByIdAndDelete(id, (err) => {
        if(err) {
            res.status(400).send({msg: "Error al eliminar curso."});
        } else {
            res.status(200).send({msg: "Curso eliminado."});
        }
    });
}

module.exports = {
    createCourse,
    getCourses,
    updateCourse,
    deleteCourse
};