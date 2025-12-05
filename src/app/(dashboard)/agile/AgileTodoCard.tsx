import { useState } from "react";
import { Card, CardContent, Typography, IconButton, TextField, Stack, Box, useTheme } from "@mui/material";
import { Edit as EditIcon, Save as SaveIcon, Close as CloseIcon } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import { DraggableProvided, DraggableStateSnapshot } from "@hello-pangea/dnd";
import { TodoDTO } from "@/types/todo";
import { UpsertTodoInput } from "@/lib/validation/todo";

interface AgileTodoCardProps {
  todo: TodoDTO;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  updateTodo: (data: UpsertTodoInput) => void;
}

export function AgileTodoCard({ todo, provided, snapshot, updateTodo }: AgileTodoCardProps) {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");
  const [dueDate, setDueDate] = useState<Date | null>(todo.dueDate ? new Date(todo.dueDate) : null);

  const { innerRef, draggableProps, dragHandleProps } = provided;

  const handleSave = () => {
    updateTodo({
      id: todo.id,
      title,
      description: description || undefined,
      status: todo.status,
      dueDate: dueDate || undefined,
      tags: todo.tags
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(todo.title);
    setDescription(todo.description || "");
    setDueDate(todo.dueDate ? new Date(todo.dueDate) : null);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Card
        ref={innerRef}
        {...draggableProps}
        sx={{
          cursor: "default",
          ...draggableProps.style,
          opacity: snapshot.isDragging ? 0.8 : 1
        }}
      >
        <CardContent>
          <Stack spacing={2}>
            <TextField
              fullWidth
              size="small"
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              fullWidth
              size="small"
              label="Description"
              multiline
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <DatePicker
              label="Due Date"
              value={dueDate}
              onChange={(newValue) => setDueDate(newValue)}
              slotProps={{ textField: { size: "small", fullWidth: true } }}
            />
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <IconButton size="small" onClick={handleCancel} color="error">
                <CloseIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={handleSave} color="primary">
                <SaveIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      ref={innerRef}
      {...draggableProps}
      {...dragHandleProps}
      sx={{
        cursor: "grab",
        "&:hover": { boxShadow: theme.shadows[4] },
        transition: "box-shadow 0.2s",
        position: "relative",
        ...draggableProps.style,
        opacity: snapshot.isDragging ? 0.8 : 1
      }}
    >
      <CardContent sx={{ pr: 4 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          {todo.title}
        </Typography>
        {todo.description && (
          <Typography variant="body2" color="text.secondary" noWrap>
            {todo.description}
          </Typography>
        )}
        {todo.dueDate && (
          <Typography variant="caption" display="block" mt={1} color="text.secondary">
            Due: {new Date(todo.dueDate).toLocaleDateString()}
          </Typography>
        )}
        <Box sx={{ position: "absolute", top: 8, right: 8 }}>
           <IconButton 
             size="small" 
             onClick={(e) => {
               e.preventDefault();
               e.stopPropagation();
               setIsEditing(true);
             }}
             onMouseDown={(e) => e.stopPropagation()}
           >
             <EditIcon fontSize="small" />
           </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}
