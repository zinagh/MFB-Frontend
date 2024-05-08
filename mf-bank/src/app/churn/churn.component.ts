import { ModelInput } from '../models/ModelInput';
import { BankAccountDto } from './../models/BankAccountDto';
import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Userdto } from '../models/Userdto';
@Component({
  selector: 'app-churn',
  templateUrl: './churn.component.html',
  styleUrls: ['./churn.component.css']
})
export class ChurnComponent implements OnInit{


  constructor(private router: Router ,private formBuilder: FormBuilder, private userService: UsersService , private route: ActivatedRoute ){}
  userForm!: FormGroup;
  user!:Userdto;
  username!: string ;
  users!: Userdto[];
  selectedUser:string = "Select User";
  account_Balance!: number;
  bankAccountDto!: BankAccountDto;
  Gender_Female: number = -1;
  Gender_Male: number=-1;
  numOfProducts!: number;
  BalanceSalaryRatio : number =0;
  selectedGender!: string ;
  CreditScoreGivenAge: number =0;
  Geography_Spain: number=-1;
  Geography_France: number=1 ;
  Geography_Germany: number=-1;
  EstimatedSalary: number=0;
  Tenure: number=0;
  CreditScore: number=0
  showResults = false;
  result : string =''
onGenderChange(gender: string): void {
  if ( this.selectedGender  === 'male' ){
    this.Gender_Male=1
    this.Gender_Female=-1

  }else {this.Gender_Female=1
    this.Gender_Male=-1
  }


}

    navigateTousers(){
    this.router.navigate(['/dashboard']);
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({

      nom: [''],
      prenom: [''],
      dateNaissance: [''],
      cin: [''],
      email: [''],
      numTel: [''],
      account_Balance: [''],
      EstimatedSalary: [null, Validators.required],
      CreditScore: [null,this.creditScoreValidator],
      Tenure: [null, Validators.required ],
      Gender:['']
    });
    this.retrieveAllUsers();



}

creditScoreValidator(control: FormControl): ValidationErrors | null {
  const value = Number(control.value);
  if (isNaN(value) || value < 300 || value > 850) {
    return { creditScoreRange: true };
  }
  return null;
}
onUserSelect(event: any): void {
  const selectedValue: string | null = event?.target?.value;
  if (selectedValue) {
    console.log("selected user " + selectedValue);

    this.retrieveUser(selectedValue);
    this.retrieveAccountBalance(selectedValue);
  }
}


retrieveAccountBalance(bankAccountTitulaire: string): void {
  console.log('Account balance titulaire:', bankAccountTitulaire);
  this.userService.retrieveAccountBalance(bankAccountTitulaire).subscribe(
    balance => {
      console.log('Account balance retrieved:', balance);
      this.userForm.patchValue({
        account_Balance: balance
      });
    },
    error => {
      console.error('Error retrieving account balance:', error);
    }
  );
}
churn!: ModelInput ;

onSubmit(): void {
this.loading = true;
this.churnUpdate();
this.predict(this.churn)
}

churnUpdate() {
const Age: number  = this.calculateAge();
const CreditScore= this.userForm.get('CreditScore')?.value
 const Tenure= this.userForm.get('Tenure')?.value
 const HasCrCard =1
 const IsActiveMember =1
 const TenureByAge=this.userForm.get('account_Balance')?.value
 const CreditScoreGivenAge:number =0;
 this.CreditScoreGivenAge= CreditScore/ Age ;
console.log('The calculated age is:', Age);
const Balance=this.userForm.get('account_Balance')?.value
const EstimatedSalary = this.userForm.get('EstimatedSalary')?.value
const Geography_Spain=-1;
const Geography_France=1 ;
const Geography_Germany=-1;
const BalanceSalaryRatio = Balance/EstimatedSalary
if (CreditScore < 400) {
  this.numOfProducts = 0.3;
} else {
  this.numOfProducts = 1;
}

if (CreditScore < 400) {
  this.numOfProducts = 1;
} else {
  this.numOfProducts = 0.3;
}

console.log(this.numOfProducts);
 const Gender_Female=this.Gender_Female;
 const Gender_Male=this.Gender_Male;

this.churn = {
  CreditScore: CreditScore,
  Age: Age,
  Tenure:Tenure,
  Balance:Balance,
  NumOfProducts: this.numOfProducts,
  EstimatedSalary:EstimatedSalary,
  BalanceSalaryRatio:BalanceSalaryRatio,
  TenureByAge:TenureByAge,
  CreditScoreGivenAge:CreditScoreGivenAge,
  HasCrCard:HasCrCard,
  IsActiveMember:IsActiveMember,
  Geography_Spain:Geography_Spain,
  Geography_France:Geography_France,
  Geography_Germany:Geography_Germany,
  Gender_Female:Gender_Female,
  Gender_Male:Gender_Male
  }
  console.log(this.churn);
}
retrieveUser(username: string) {
  this.userService.retrieveUser(username).subscribe(
    (data) => {
  this.user = data ;
  console.log(this.user);
  const dateNaissance = this.user.dateNaissance ? new Date(this.user.dateNaissance).toISOString().split('T')[0] : null;
  this.userForm.patchValue({
    nom: this.user.nom,
    prenom: this.user.prenom,
    dateNaissance: dateNaissance,
    cin: this.user.cin,
    email: this.user.email,
    numTel: this.user.numTel

  });
}
  );

}

label!: string | null;
loading: boolean = false;
predict(inputData: ModelInput): void {
  console.log(inputData);
  this.userService.predict(inputData).subscribe({
    next: (response) => {
      console.log('Prediction successful:', response);
      this.label = response;
      console.log(this.label);
      this.loading = false;
      this.showResults = true;

    },
    error: (error) => {
      console.error('Prediction failed:', error);
      this.loading = false;
    }
  });
}



calculateAge(): number  {
  const birthDate: string = this.userForm.get('dateNaissance')?.value;


  const today: Date = new Date();
  const dob: Date = new Date(birthDate);
  let age: number = today.getFullYear() - dob.getFullYear();
  const monthDiff: number = today.getMonth() - dob.getMonth();


  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return age;
}

retrieveAllUsers(): void {
  this.userService.retrieveAllUsers().subscribe({
    next: (data: Userdto[]) => {
      this.users = data;
      console.log(this.users);
    },
    error: (error: any) => {
      console.error('An error occurred:', error);
      // Handle error
    }
  });
}


}
