$(document).ready(function ()
{
    //LOAD WRITTEN TASK FROM FT LIST//
    load_tasks_data();

    //CREATE NEW TASK//
    $('#request_new_task').click(function ()
    {
        let _task_text = prompt("Enter a new task:");
        create_a_task(_task_text);
    });

    function create_a_task(text)
    {
        const _task_bar = $('<li>', { class: "task_bar" });

        const _checkbox = $('<div>', { class: "checkbox" }).click(function ()
        {
            toggle_check_box($(this));
        });

        const _task_text = $('<span>', { class: "task-text" }).text(text).click(function ()
        {
            request_delete_task(_task_bar);
        });

        _task_bar.append(_checkbox).append(_task_text);
        $("#ft_list").prepend(_task_bar);
        save_all_tasks();
    }

    //CHECKING BOX//
    function toggle_check_box(_checkbox)
    {
        _checkbox.toggleClass("checked-box");
        const _task_bar = _checkbox.parent();
        _task_bar.toggleClass("checked-taskbar", _checkbox.hasClass("checked-box"));
        save_all_tasks();
    }


    //DELETE TASK//
    function request_delete_task(_task_bar)
    {
        if (confirm("Delete Task")) 
        {
            _task_bar.remove();
            save_all_tasks();
        }
    }

    //SAVE TASK DATA//
    function save_all_tasks() 
    {
        const tasks = [];
        $(".task_bar").each(function () 
        {
            const _box_checked = $(this).find('.checkbox').hasClass("'checked-box'");
            tasks.push
            ({
                text: $(this).find('.task-text').text(),
                checked: _box_checked
            });
        });
        localStorage.setItem("ft_list", JSON.stringify(tasks));
    }

    //LOAD TASK DATA//
    function load_tasks_data() 
    {
        const _saved_tasks = JSON.parse(localStorage.getItem("ft_list")) || [];
        _saved_tasks.forEach(function (task) 
        {
            const _task_bar = $('<li>', { class: 'task_bar' }).addClass(task.checked ? 'checked-taskbar' : '');
            const _checkbox = $('<div>', { class: 'checkbox' }).click(function ()
            {
                toggle_check_box($(this));
            });

            if (task.checked) 
            {
                checkbox.addClass("checked-box");
            }

            const _task_text = $('<span>', { class: 'task-text' }).text(task.text).click(function ()
            {
                request_delete_task(_task_bar);
            });

            _task_bar.append(_checkbox).append(_task_text);
            $('#ft_list').prepend(_task_bar);
        });
    }
});