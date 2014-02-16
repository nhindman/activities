<script id='activity_template' type="text/template">
  <span class="description_line"><%= description %></span>
  <button class="edit">Edit</button>
  <button class="delete">Delete</button>
</script>


<script id='edit_form_template' type="text/template">
  <form class="edit_form">
    <input type="text" class="edit_input" name="edit_input" value="<%= description %>"/>
    <button class="update_button">Update</button>
  </form>  
</script>