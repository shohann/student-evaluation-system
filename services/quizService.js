const { Quiz } = require('../utils/dbInit');

const createQuiz = async (groupId, name) => {
    const newQuiz = await Quiz.create({
        data: {
            name: name,
            full_marks: 40,
            pass_marks: 10,
            groupId: groupId
        }
    });
};

createQuiz('45c49bd1-6ff0-43cc-85fc-617b821ba6eb', 'Quiz-1')



// 45c49bd1-6ff0-43cc-85fc-617b821ba6eb

// id  String @default(uuid()) @unique @id
// name String
// full_marks Int
// pass_marks Int
// negative_marks Int?
// questions Question[]
// answers Answer[]
// result Result[]