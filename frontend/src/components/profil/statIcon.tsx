function StatIcon(name: string, value: number) {
    return (
        <div className="stat-icon">
            <p>{name}</p>
            <p>{value}</p>
        </div>
    );
}

export default StatIcon;