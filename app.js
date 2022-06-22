//selecting the elements
let  inputvalue=document.querySelector(".form-control");
let list=document.querySelector('.item-list');
let clearbtn=document.querySelector('.clear');
let form =document.querySelector('.form');
let submit=document.querySelector("#mybtn");
let grocery=document.querySelector('.grocery-list');
let alert_value=document.querySelector('.alert');
let deleteBtn;
//functions
function AlertDisplay(msg,info)
{
   alert_value.textContent=msg;
   alert_value.classList.add(`alert-${info}`);

  setTimeout(()=>{
    alert_value.textContent='';
    alert_value.classList.remove(`alert-${info}`);
  },1500);
} 
//edit options
let EditElement;
let editflag=false;
let editId;

//adding listeners
form.addEventListener("submit",(e)=>{
  e.preventDefault();
  let val=inputvalue.value;
  if(val && !editflag)
  {
    let id =new Date().getTime().toString();
   let div =document.createElement('div');
   div.classList.add('items');
   let attr=document.createAttribute('data-id');
   attr.value=id;
   div.setAttributeNode(attr);
   div.innerHTML=`
   <h5 class="item">${val}</h5>
              <div class="btns">
                <i class="fas fa-edit editBtn"></i>
                <i class="fas fa-trash deleteBtn"></i>
              </div>
   `
 
   list.classList.add('show-list');
   grocery.append(div);

     /*editing an item*/
let editbtn=document.querySelectorAll('.editBtn');
editbtn.forEach(item=>{
  item.addEventListener('click',editItem);
})
     
      /*deleting an item*/
  deleteBtn=document.querySelectorAll('.deleteBtn');
deleteBtn.forEach((items)=>{
  items.addEventListener('click',deleteItem);
})
 inputvalue.value ="";
   AlertDisplay("item add successfully",'success');
  
  }
  else if(val && editflag)
  {
      EditElement.innerHTML=val;
      AlertDisplay("value changed",'success');
      Default();
  }
  else
  {
    AlertDisplay("please enter a value",'danger');
  }
});

      /*clearing button*/
clearbtn.addEventListener('click',()=>{
  let removeItems=document.querySelectorAll('.items');
  removeItems.forEach((item)=>{
    item.remove();
  })
  list.classList.remove('show-list');
  AlertDisplay("List cleared successfully",'danger');
  Default();
});

  /*deleting function*/
function deleteItem(e){
  let delitem=e.currentTarget.parentElement.parentElement;
  grocery.removeChild(delitem);
  if(grocery.children.length===0)
     list.classList.remove('show-list');
  AlertDisplay("Item removed successfully",'danger');
}
    /*editing function*/
function editItem(e){
  EditElement=e.currentTarget.parentElement.previousElementSibling;
  inputvalue.value=EditElement.innerHTML;
  editId=EditElement.dataset.id;
  editflag=true;
  submit.textContent="edit";
}

/*setting things back to default*/
function Default(){
  editflag=false;
  editId="";
  submit.textContent="submit";
  inputvalue.value="";
}