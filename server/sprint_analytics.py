from datetime import datetime, timedelta

def calculate_sprint_analytics(sprint, tickets):
    today = datetime.today().date()
    days_open = (today - sprint.start_date).days if sprint.start_date else 0
    completed_story_points = sum(ticket.story_points for ticket in tickets if ticket.status == 'complete')
    remaining_story_points = sum(ticket.story_points for ticket in tickets if ticket.status != 'complete')

    current_pace = completed_story_points / days_open if days_open > 0 else 0
    expected_days_remaining = (remaining_story_points / current_pace) if current_pace > 0 else float('inf')

    return {
        "days_open": days_open,
        "current_pace": current_pace,
        "expected_days_remaining": expected_days_remaining
    }