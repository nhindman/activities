<script id='activity_template' type="text/template">
  <span class="description_line"><%= description %></span>
  <button class="add_to_outing_button">+</button>
</script>


<script id='edit_form_template' type="text/template">
  <form class="edit_form">
    <input type="text" class="edit_input" name="edit_input" value="<%= description %>"/>
    <button class="update_button">Update</button>
    <button class="delete">Delete</button>
  </form>  
</script>


<script id='outing_editor_item_template' type="text/template">
  <p class="description_line">
  <span><%= description %></span>
  <button class="remove_button">-</button>
  </p>
</script>
