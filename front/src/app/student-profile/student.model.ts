
  export class StudentModel{
    constructor(
        public _id:String,
        

        public image:{
             data: any,
            contentType: String},
        public imageUrl:any,
        public Name: string,
        public Email: string,
        public Phone: string,
        public State: string,
        public HighestQualification: string,
        public PassOfYear: string,
        public SkillSet: string,
        public EmploymentStatus: string,
        public Course: string,
        public DOB: string,
        public Password: string,

            )
    {}
}