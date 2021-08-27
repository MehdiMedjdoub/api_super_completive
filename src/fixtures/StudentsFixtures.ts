var faker = require("faker");
import { StudentModel } from '../models/StudentModel'

faker.locale = "fr";

const mailProvider =['gmail', 'outlook', 'yahoo', 'icloud', 'zoho', 'gmx']
const random = Math.floor(Math.random() * mailProvider.length);

const streetNumber = faker.random.number().toString()

// class: "master1"
// faculty: "développement"
// phone: "0605040302"
// promo: "6124f3b8d994a9f9bedc710d"
// sex: "m"

console.log(faker.phone.phoneNumber())
console.log(faker.phone.phoneNumberFormat())
console.log(faker.phone.phoneFormats())

// for (let i = 0; i < 20; i++) {
	const arrName = faker.name.findName().toLowerCase().split(' ')

	if (arrName.length > 2) {
		(arrName[2].length < 4) ? arrName.pop() : arrName.shift()
	}

	const student = new StudentModel()
	student.firstName = arrName[0]
	student.lastName = arrName[1]
	student.email = arrName[0] + "." + arrName[1] + '@' + mailProvider[random] + '.com'
	student.cp = faker.address.zipCode()
	student.city = faker.address.city()
	student.adress = streetNumber.substring(0, 2) + ', rue ' + faker.random.word()

	// console.log(student)
	// student.adress = 
// }