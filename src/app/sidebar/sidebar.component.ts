import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { MessageService } from '../services/message.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    standalone: false
})

export class SidebarComponent implements OnInit {

  categoryItems:Array<string>=[]
  activeLink: string | null = null;

constructor(private categoryService:CategoryService,private messageService:MessageService){
  
}

ngOnInit(): void {
  this.getCategoryLists()
}

getCategoryLists(){
  this.categoryService.getCategoryList().subscribe(
    (success:any)=>{
      this.categoryItems=success
    },
    (error)=>{
      console.log('sidebar:',error)
    }
  )
}

//to send category when clicked on the sidebar
 sendCategory(send_category:string){
  //console.log('send category:', send_category)
   this.messageService.sendMessage(send_category)
   this.activeLink=send_category
 }

 


}



