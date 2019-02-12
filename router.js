var express = require('express')
var fs = require('fs')

var router = express.Router()

var dbPath = './db.json'

//显示 index.html
router.get('/', function(req, res) {
	fs.readFile(dbPath, 'utf8', function(err, data) {
		if (err) {
			return res.send('not find db，js')
		}
		var students = JSON.parse(data).students
		//console.log(students)
		res.render('index.html', {
			persons: students
		})
	})
})

//显示编辑界面
router.get('/add', function(req, res) {
	res.render('add.html')
})

//发送新增的信息
router.post('/add', function(req, res) {
	var student = req.body

	fs.readFile(dbPath, 'utf8', function(err, data) {
		if (err) {
			return res.send('not find db.js')
		}
		var students = JSON.parse(data).students

		student.id = students[students.length - 1].id + 1	
		students.push(student)

		console.log(students)
		var fileData = JSON.stringify({
			students: students
		})
		
		fs.writeFile(dbPath, fileData, function(err) {
			if (err) {
				return res.send('can not save')
			}
			res.redirect('/')
		})
	})
})

//显示编辑界面
router.get('/edit', function(req, res) {
	var stuId = parseInt(req.query.id)

	fs.readFile(dbPath, 'utf8', function(err, data) {
		if (err) {
			return res.send('not find db，js')
		}
		var students = JSON.parse(data).students
		
		var student = students.find(function(item) {
			return item.id === stuId
		})

		res.render('edit.html', {
			person: student
		})
	})

})

//保存重新编辑后的信息
router.post('/edit', function(req, res) {
	var student = req.body
	student.id = parseInt(student.id)

	fs.readFile(dbPath, 'utf8', function(err, data) {
		if (err) {
			return res.send('not find db.js')
		}
		var students = JSON.parse(data).students

		var stu = students.find(function(item) {
			return item.id === student.id
		})
		
		for(var key in stu) {
			stu[key] = student[key]
		}

		var fileData = JSON.stringify({
      		students: students
    	})

		fs.writeFile(dbPath, fileData, function(err) {
			if (err) {
				return res.send('can not save')
			}
			res.redirect('/')
		})
	})
})

//删除信息
router.get('/delete', function(req, res) {
	var stuId = parseInt(req.query.id)

	fs.readFile(dbPath, 'utf8', function(err, data) {
		if (err) {
			return res.send('not find db.js')
		}
		var students = JSON.parse(data).students

		var delId = students.findIndex(function(item) {
			return item.id === stuId
		})

		students.splice(delId, 1)

		var fileData = JSON.stringify({
			students: students
		})

		fs.writeFile(dbPath, fileData, function(err) {
			if (err) {
				return res.send('can not save')
			}
			res.redirect('/')
		})
	})
})


module.exports = router