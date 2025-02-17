import React, { useState } from "react";
import { Card, Modal, Input, Form, Badge } from "antd";
import dayjs from "dayjs";

const FullYearCalendar = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [form] = Form.useForm();

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setModalVisible(true);
  };

  const handleAddEvent = () => {
    form.validateFields().then((values) => {
      const newEvents = { ...events };
      const dateStr = selectedDate.format("YYYY-MM-DD");

      if (!newEvents[dateStr]) {
        newEvents[dateStr] = [];
      }
      newEvents[dateStr].push(values.event);

      setEvents(newEvents);
      setModalVisible(false);
      form.resetFields();
    });
  };

  const renderMonth = (monthIndex) => {
    const startOfMonth = dayjs().month(monthIndex).startOf("month");
    const daysInMonth = startOfMonth.daysInMonth();
    const firstDayOfWeek = startOfMonth.day(); // 0 = Sunday, 1 = Monday, etc.

    // Create an array for all days in the month
    const days = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null); // Empty slots for alignment
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(startOfMonth.date(i));
    }

    return (
      <Card key={monthIndex} title={startOfMonth.format("MMMM YYYY")} 
      style={{ 
        width: '100%', 
        background: 'rgb(255, 255, 255)',
        boxShadow: 'rgba(0, 0, 0, 0.11) 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 0.5px 1.5px',
        }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 5, }}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <strong key={day} style={{ textAlign: "center" }}>{day}</strong>
          ))}

          {days.map((date, index) =>
            date ? (
              <div
                key={index}
                onClick={() => handleDateClick(date)}
                style={{
                  textAlign: "center",
                  padding: 10,
                  cursor: "pointer",
                  backgroundColor: "#f5f5f5",
                  borderRadius: 5,
                }}
              >
                {date.date()}
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {(events[date.format("YYYY-MM-DD")] || []).map((event, idx) => (
                    <li key={idx}>
                      <Badge status="success" text={event} />
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div key={index} style={{ padding: 10 }}></div> // Empty space
            )
          )}
        </div>
      </Card>
    );
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(370px, 1fr))", gap: 20, }}>
      {[...Array(12).keys()].map((monthIndex) => renderMonth(monthIndex))}

      <Modal
        title={`Add Event on ${selectedDate ? selectedDate.format("YYYY-MM-DD") : ""}`}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleAddEvent}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="event" label="Event Name" rules={[{ required: true, message: "Please enter event name" }]}>
            <Input placeholder="Enter event details" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FullYearCalendar;
